import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PreBooking = () => {
    const [selectedRoomPrice, setSelectedRoomPrice] = useState("");
    const [selectPerson, setSelectPerson] = useState(2);
    const { register, handleSubmit } = useForm();
    const [category, setCategory] = useState([]);
    const [roomNumber, setRoomNumber] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedRoomCat, setSelectedRoomCat] = useState("");
    const [duration, setDuration] = useState(1);

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
    // get room number
    const fetchRoomNumber = () => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/room/available-room`)
            .then((response) => {
                setRoomNumber(response.data);
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
        fetchRoomNumber();
    }, []);

    console.log(roomNumber);
    
    // add pre - booking data
    const onSubmit = (data) => {
        console.log(data);

        axios
            .post(`${BASE_URL}/prebook/add`, {
                date_time: data.date_time,
                name: data.name,
                room_number: data.room_number,
                room_category: selectedRoomCat.name,
                room_price: data.room_price,
                nationality: data.nationality,
                company: data.company,
                phone: data.phone,
                person: data.person,
                duration_day: data.duration_day,
                booking_by: data.booking_by,
            })
            .then((response) => {
                toast.success("Pre Booking added successfully!");
                console.log(response);

                fetchCategories();
                fetchRoomNumber();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to add booking!");
            });
    }

    /* Select room by price */
    const handleRoomSelection = (roomId) => {
        // get room to price
        const selectedRoom = roomNumber.find(room => room.room_number == parseInt(roomId));
        setSelectedRoomPrice(selectedRoom ? selectedRoom.price : "");
        // get room to category
        const selectedCat = roomNumber.find(room => room.room_number == parseInt(roomId));
        setSelectedRoomCat(selectedCat ? selectedCat.category : "");
    };


    // calculate price
    const calculateRoomPrice = () => {
        const basePrice = parseFloat(selectedRoomPrice) || 0;
        if (selectPerson == 1) {
            return (basePrice - 500).toFixed(2);
        } else if (selectPerson > 2) {
            return (basePrice + (selectPerson - 2) * 1000).toFixed(2);
        }
        return basePrice.toFixed(2);
    };

    const handleCheck = () => {
        let checkInputData = document.getElementById('checkOut').value;
        if (checkInputData == '') {
            toast.error('Select Checkout Date')
        } else {
            setShowForm(true);
        }

    };


    return (
        <div>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        {/* Add Category Form */}
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Pre Booking</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="w-full mb-5">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Check in Date & Time <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        {...register("date_time", { required: true })}
                                                        name="date_time"
                                                        type="datetime-local"
                                                        className="form-control"
                                                        id="checkOut"
                                                        placeholder="Booking by reference"
                                                    />
                                                </div>
                                                <button onClick={handleCheck} className="btn btn-primary">Check</button>
                                            </div>
                                            {showForm && (
                                                <>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Person Name <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                {...register("name", { required: true })}
                                                                name="name"
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-fullname"
                                                                placeholder="Person Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Room Number <span className="text-danger">*</span>
                                                            </label>
                                                            {
                                                                <select
                                                                    {...register("room_number", { required: true })}
                                                                    className="form-control"
                                                                    name="room_number"
                                                                    onChange={(e) => {
                                                                        handleRoomSelection(e.target.value);
                                                                    }}
                                                                    id="">
                                                                    <option value="">Select Room Number</option>
                                                                    {
                                                                        roomNumber.map(item => {
                                                                            return (
                                                                                <>
                                                                                    <option key={item.id} value={item.room_number}>{item.room_number}</option>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }

                                                                </select>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Select Room Category <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                {...register("room_category", { required: false })}
                                                                type="text"
                                                                name="room_category"
                                                                className="form-control"
                                                                id="room_category"
                                                                value={selectedRoomCat.name}
                                                                disabled
                                                                placeholder="Room Cateogry"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Nationality <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                {...register("nationality", { required: true })}
                                                                name="nationality"
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-fullname"
                                                                placeholder="Nationality"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Company Name 
                                                            </label>
                                                            <input
                                                                {...register("company", { required: false })}
                                                                name="company"
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-fullname"
                                                                placeholder="Company Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Mobile <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                {...register("phone", { required: true })}
                                                                name="phone"
                                                                type="number"
                                                                className="form-control"
                                                                id="basic-default-fullname"
                                                                placeholder="Mobile"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Person <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                {...register("person", { required: true })}
                                                                name="person"
                                                                type="number"
                                                                className="form-control"
                                                                id="basic-default-fullname"
                                                                placeholder="Person"
                                                                onChange={(e) => {
                                                                    setSelectPerson(e.target.value);
                                                                }}
                                                                value={selectPerson}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Duration Of Stay <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                {...register("duration_day", { required: true })}
                                                                name="duration_day"
                                                                type="number"
                                                                className="form-control"
                                                                id="duration_day"
                                                                placeholder="Duration of stay"
                                                                value={duration}
                                                                onChange={(e) => setDuration(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Price - <span className="text-danger"> <span className="text-danger">*</span>
                                                                    {calculateRoomPrice() * duration} ৳ </span>
                                                            </label>
                                                            <input
                                                                {...register("room_price", { required: true })}
                                                                name="room_price"
                                                                type="number"
                                                                className="form-control"
                                                                id="basic-default-fullname"
                                                                placeholder={calculateRoomPrice() * duration}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="basic-default-fullname">
                                                                Booked by <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                {...register("booking_by", { required: true })}
                                                                name="booking_by"
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-fullname"
                                                                placeholder="Booking by reference"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <input type="submit" className="btn btn-primary" />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                    </form>
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

export default PreBooking;