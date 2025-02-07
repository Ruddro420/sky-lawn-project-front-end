import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PreBooking = () => {
    const [selectedRoomPrice, setSelectedRoomPrice] = useState("");
    const [selectPerson, setSelectPerson] = useState(2);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [category, setCategory] = useState([]);
    const [roomNumber, setRoomNumber] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedRoomCat, setSelectedRoomCat] = useState("");
    const [duration, setDuration] = useState(1);

    // Fetch data
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

    // Get room numbers
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

    // Fetch categories and room numbers on component load
    useEffect(() => {
        fetchCategories();
        fetchRoomNumber();
    }, []);

    const navigate = useNavigate();

    // Add pre-booking data
    const onSubmit = (data) => {
        // Format the date_time value
        const formattedDateTime = formatDateTime(data.date_time);

        axios
            .post(`${BASE_URL}/prebook/add`, {
                ...data,
                date_time: formattedDateTime, // Use the formatted date and time
                room_category: selectedRoomCat.name,
                room_price: calculateRoomPrice() * duration, // Calculate total price
            })
            .then((response) => {
                toast.success("Pre Booking added successfully!");
                navigate("/pre-booking-details");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Room is already pre-booked for the specified date!");
            });
    };

    // Function to format the datetime-local value
    const formatDateTime = (datetimeLocal) => {
        const date = new Date(datetimeLocal);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Handle room selection
    const handleRoomSelection = (roomId) => {
        const selectedRoom = roomNumber.find((room) => room.room_number == parseInt(roomId));
        if (selectedRoom) {
            setSelectedRoomPrice(selectedRoom.price);
            setSelectedRoomCat(selectedRoom.category);
        }
    };

    // Calculate room price based on the number of persons
    const calculateRoomPrice = () => {
        const basePrice = parseFloat(selectedRoomPrice) || 0;
        if (selectPerson == 1) {
            return basePrice - 500;
        } else if (selectPerson > 2) {
            return basePrice + (selectPerson - 2) * 1000;
        }
        return basePrice;
    };

    // Handle the "Check" button click
    const handleCheck = () => {
        const checkInputData = document.getElementById("checkOut").value;
        if (!checkInputData) {
            toast.error("Select Checkout Date");
        } else {
            setShowForm(true);
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
                                    <h5 className="mb-0">Pre Booking</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="w-full mb-5">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="checkOut">
                                                        Check in Date & Time <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        {...register("date_time", { required: "This field is required" })}
                                                        name="date_time"
                                                        type="datetime-local"
                                                        className="form-control"
                                                        id="checkOut"
                                                    />
                                                    {errors.date_time && (
                                                        <span className="text-danger">{errors.date_time.message}</span>
                                                    )}
                                                </div>
                                                <button type="button" onClick={handleCheck} className="btn btn-primary">
                                                    Check
                                                </button>
                                            </div>
                                            {showForm && (
                                                <>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="name">
                                                                Person Name
                                                            </label>
                                                            <input
                                                                {...register("name")}
                                                                name="name"
                                                                type="text"
                                                                className="form-control"
                                                                id="name"
                                                                placeholder="Person Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="room_number">
                                                                Room Number <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                {...register("room_number", { required: true })}
                                                                className="form-control"
                                                                name="room_number"
                                                                onChange={(e) => handleRoomSelection(e.target.value)}
                                                            >
                                                                <option value="">Select Room Number</option>
                                                                {roomNumber.map((item) => (
                                                                    <option key={item.id} value={item.room_number}>
                                                                        {item.room_number}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="room_category">
                                                                Select Room Category
                                                            </label>
                                                            <input
                                                                {...register("room_category")}
                                                                type="text"
                                                                name="room_category"
                                                                className="form-control"
                                                                id="room_category"
                                                                value={selectedRoomCat.name}
                                                                disabled
                                                                placeholder="Room Category"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="nationality">
                                                                Nationality
                                                            </label>
                                                            <input
                                                                {...register("nationality")}
                                                                name="nationality"
                                                                type="text"
                                                                className="form-control"
                                                                id="nationality"
                                                                placeholder="Nationality"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="company">
                                                                Company Name
                                                            </label>
                                                            <input
                                                                {...register("company")}
                                                                name="company"
                                                                type="text"
                                                                className="form-control"
                                                                id="company"
                                                                placeholder="Company Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="phone">
                                                                Mobile
                                                            </label>
                                                            <input
                                                                {...register("phone")}
                                                                name="phone"
                                                                type="number"
                                                                className="form-control"
                                                                id="phone"
                                                                placeholder="Mobile"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="person">
                                                                Person
                                                            </label>
                                                            <input
                                                                {...register("person")}
                                                                name="person"
                                                                type="number"
                                                                className="form-control"
                                                                id="person"
                                                                placeholder="Person"
                                                                onChange={(e) => setSelectPerson(e.target.value)}
                                                                value={selectPerson}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="duration_day">
                                                                Duration Of Stay
                                                            </label>
                                                            <input
                                                                {...register("duration_day")}
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
                                                            <label className="form-label" htmlFor="room_price">
                                                                Price - <span className="text-danger">
                                                                    {calculateRoomPrice() * duration} ৳
                                                                </span>
                                                            </label>
                                                            <input
                                                                {...register("room_price", { required: true })}
                                                                name="room_price"
                                                                type="number"
                                                                className="form-control"
                                                                id="room_price"
                                                                value={calculateRoomPrice() * duration}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="booking_by">
                                                                Booked by
                                                            </label>
                                                            <input
                                                                {...register("booking_by")}
                                                                name="booking_by"
                                                                type="text"
                                                                className="form-control"
                                                                id="booking_by"
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
            </div>
        </div>
    );
};

export default PreBooking;