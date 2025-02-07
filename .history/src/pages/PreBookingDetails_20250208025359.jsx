import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PreBookingDetails = () => {
    const [category, setCategory] = useState([]);
    const [room, setRoom] = useState([]);
    const [filteredRoom, setFilteredRoom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateTime,setDateTime] = useState()

    // Filter states
    const [nameFilter, setNameFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");
    const [roomFilter, setRoomFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Fetch data
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // date and time format

    function loadDateTime(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${day} - ${month} - ${year}`;
        setDateTime(formattedDate)
    }
    console.log(dateTime);
    



    // fetch category

    const fetchCategories = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/room-category`)
            .then((response) => {
                setCategory(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchRoom = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/prebook-data`)
            .then((response) => {
                const sortedData = response.data.data.sort(
                    (a, b) => new Date(b.date_time) - new Date(a.date_time)
                );
                setRoom(sortedData);
                setFilteredRoom(sortedData); // Initialize filteredRoom with sorted data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRoom();
    }, []);

    console.log(room);

    const navigate = useNavigate();

    // Booking data
    const booking = (data) => {
        navigate(`/booking/${data}`);
    };

    // Filter logic
    useEffect(() => {
        const filtered = room.filter((item) => {
            const nameMatch = nameFilter
                ? item.name.toLowerCase().includes(nameFilter.toLowerCase())
                : true;
            const phoneMatch = phoneFilter
                ? item.phone.toLowerCase().includes(phoneFilter.toLowerCase())
                : true;
            const roomMatch = roomFilter
                ? item.room_number.toString().includes(roomFilter)
                : true;
            const priceMatch = priceFilter
                ? item.room_price.toString().includes(priceFilter)
                : true;
            const statusMatch = statusFilter
                ? (statusFilter == "booked" && item.status == 1) ||
                (statusFilter == "available" && item.status != 1)
                : true;

            return nameMatch && phoneMatch && roomMatch && priceMatch && statusMatch;
        });

        setFilteredRoom(filtered);
    }, [nameFilter, phoneFilter, roomFilter, priceFilter, statusFilter, room]);

    // delete data
    // Delete a category
    const deleteRoom = (id) => {
        if (window.confirm("Are you sure you want to delete this ?")) {
            axios
                .get(`${BASE_URL}/prebook/delete/${id}`)
                .then(() => {
                    toast.success("Deleted successfully!");
                    fetchCategories(); // Refresh the category list
                    fetchRoom();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to delete !");
                });
        }
    };

    return (
        <div>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Pre Booking Details</h5>
                                </div>
                                <div className="card-body">
                                    {/* Filter Inputs */}
                                    <div className="row mb-3">
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                placeholder="Filter by Name"
                                                className="form-control"
                                                value={nameFilter}
                                                onChange={(e) => setNameFilter(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                placeholder="Filter by Phone"
                                                className="form-control"
                                                value={phoneFilter}
                                                onChange={(e) => setPhoneFilter(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                placeholder="Filter by Room No"
                                                className="form-control"
                                                value={roomFilter}
                                                onChange={(e) => setRoomFilter(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                placeholder="Filter by Price"
                                                className="form-control"
                                                value={priceFilter}
                                                onChange={(e) => setPriceFilter(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <select
                                                className="form-control"
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                            >
                                                <option value="">All Status</option>
                                                <option value="booked">Booked</option>
                                                <option value="available">Available</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <div className="table-responsive text-nowrap">
                                                {filteredRoom.length === 0 ? (
                                                    <div
                                                        className="alert alert-warning"
                                                        role="alert"
                                                    >
                                                        No Data Found
                                                    </div>
                                                ) : (
                                                    <table className="table order-4 border">
                                                        <thead>
                                                            <tr>
                                                                <th>SL</th>
                                                                <th>Date</th>
                                                                <th>Name</th>
                                                                <th>Phone</th>
                                                                <th>Person</th>
                                                                <th>Room Number</th>
                                                                <th>Price</th>
                                                                <th>D.D</th>
                                                                <th>Booked By</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="table-border-bottom-0">
                                                            {filteredRoom.map((item, index) => (
                                                                <tr
                                                                    key={index}
                                                                    style={{
                                                                        backgroundColor:
                                                                            index === 0
                                                                                ? "#dff0d8" // Light green for the latest row
                                                                                : "transparent",
                                                                    }}
                                                                >
                                                                    <td>{index + 1}</td>
                                                                    <td>{/* {item?.date_time} */} {() => loadDateTime(item?.date_time)}</td>
                                                                    {/* <td>{new Date(
                                                                        item?.date_time
                                                                    ).toLocaleString("en-bd", {
                                                                        dateStyle: "medium",
                                                                        timeStyle: "short",
                                                                    })}</td> */}
                                                                    <td>{item.name}</td>
                                                                    <td>{item.phone}</td>
                                                                    <td>{item.person}</td>
                                                                    <td>{item.room_number}</td>
                                                                    <td>{item.room_price}</td>
                                                                    <td>{item.duration_day}</td>
                                                                    <td>{item.booking_by}</td>
                                                                    <td>
                                                                        {item.status == 1 ? (
                                                                            <button
                                                                                disabled
                                                                                className="btn btn-primary"
                                                                            >
                                                                                Booked
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                onClick={() =>
                                                                                    booking(item.id)
                                                                                }
                                                                                className="btn btn-danger"
                                                                            >
                                                                                Apply Booking
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            onClick={() => { deleteRoom(item?.id) }}
                                                                            className="btn btn-primary ms-2">Delete</button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-backdrop fade"></div>
            </div>
        </div>
    );
};

export default PreBookingDetails;
