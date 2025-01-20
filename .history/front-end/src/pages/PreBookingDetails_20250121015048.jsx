import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreBookingDetails = () => {

    const [category, setCategory] = useState([]);
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(true);
      // fetch data
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    // Fetch categories on component load
    useEffect(() => {
        fetchCategories();
    }, []);


    // get preBookdata details
    const fetchRoom = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/prebook-data`)
            .then((response) => {
                setRoom(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Fetch room fetch
    useEffect(() => {
        fetchRoom();
    }, []);
    const navigate = useNavigate()
    // booking data
    const booking = (data) =>{
        navigate(`/booking/${data}`)
    }
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
                                    <div className="col-12">
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <div className="table-responsive text-nowrap">
                                                {
                                                    category.length == 0 ? <div className="alert alert-warning" role="alert">
                                                        No Data Found
                                                    </div> : <table className="table order-4 border">
                                                        <thead>
                                                            <tr>
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
                                                            {room.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.name} </td>
                                                                    <td>{item.phone} </td>
                                                                    <td>{item.person} </td>
                                                                    <td>{item.room_number} </td>
                                                                    <td>{item.room_price} </td>
                                                                    <td>{item.duration_day} </td>
                                                                    <td>{item.booking_by} </td>
                                                                    <td>
                                                                        <button onClick={()=>booking(item.id)} className="btn btn-success">Booking</button>
                                                                        {/*  <button onClick={() => { deleteRoom(item.id) }} className="btn btn-danger ms-2">Delete</button> */}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                }

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