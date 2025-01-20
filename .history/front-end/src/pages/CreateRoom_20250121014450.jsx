import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const CreateRoom = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [category, setCategory] = useState([]);
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getRoom, setGetRoom] = useState('');
    const [status, setStatus] = useState()
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

    // get room details
    const fetchRoom = () => {
        setLoading(true);
        axios
            .get("http://192.168.0.115:8000/api/room/data")
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
    // get form data
    const onSubmit = (data) => {
        axios
            .post("http://192.168.0.115:8000/api/room/add", {
                room_number: data.room_number,
                room_name: data.room_name,
                room_category_id: data.room_category_id,
                price: data.price,
                feature: data.feature,
            })
            .then(() => {
                toast.success("Room added successfully!");
                //setGetCategory("");
                fetchCategories(); // Refresh the category list
                fetchRoom();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to add room!");
            });
    }

    // Delete a category
    const deleteRoom = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            axios
                .get(`http://192.168.0.115:8000/api/room/delete/${id}`)
                .then(() => {
                    toast.success("Room deleted successfully!");
                    fetchCategories(); // Refresh the category list
                    fetchRoom();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to delete room!");
                });
        }
    };

    // edit room
    const editRoom = (id) => {
        const data = room.find(item => item.id == id)
        setGetRoom(data);

    }
    // change edit
    const handleChange = (e) => {
        e.preventDefault()
        axios
            .post("http://192.168.0.115:8000/api/room/update/status", {
                id: getRoom.id,
                status: status,
            })
            .then(() => {
                toast.success("Update Successfully!");
                //setGetCategory("");
                fetchCategories();
                fetchRoom();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to add room!");
            });
    }



    return (
        <div>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        {/* Add Category Form */}
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Add Room</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Number
                                                    </label>
                                                    <input
                                                        {...register("room_number", { required: true })}
                                                        name="room_number"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Name
                                                    </label>
                                                    <input
                                                        {...register("room_name", { required: true })}
                                                        name="room_name"
                                                        type="text"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Select Room Category
                                                    </label>
                                                    <select
                                                        {...register("room_category_id", { required: true })}
                                                        className="form-control"
                                                        name="room_category_id"
                                                        id="">
                                                        <option value="">Select Room Category</option>
                                                        {
                                                            category.map(item => {
                                                                return (
                                                                    <>
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">
                                                        Room Price / 2 Person
                                                    </label>
                                                    <input
                                                        {...register("price", { required: true })}
                                                        name="price"
                                                        type="number"
                                                        className="form-control"
                                                        id="basic-default-fullname"
                                                        placeholder="Room Price"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input-group input-group-merge mb-3 mt-2">
                                                    <textarea
                                                        {...register("feature", { required: true })}
                                                        name="feature"
                                                        id="basic-icon-default-message"
                                                        className="form-control"
                                                        placeholder="Room Feature"
                                                        aria-label="Hi, Do you have a moment to talk Joe?"
                                                        aria-describedby="basic-icon-default-message2"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary" />
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Room Table */}
                        <div className="col-12">
                            <div className="card mb-4">
                                {/* <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Room Details</h5>
                                </div> */}
                                <div className="card-body">
                                    {/* Categories Table */}
                                    <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0">Room Details</h5>
                                            </div>
                                            <div className="card-body">
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
                                                                        <th>Number</th>
                                                                        <th>Name</th>
                                                                        <th>Category</th>
                                                                        <th>Price</th>
                                                                        <th>Features</th>
                                                                        <th>Status</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody className="table-border-bottom-0">
                                                                    {room.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>{item.room_number} </td>
                                                                            <td>{item.room_name} </td>
                                                                            <td>{item.category.name} </td>
                                                                            <td>{item.price} </td>
                                                                            <td>{item.feature} </td>
                                                                            <td>{item.status} </td>
                                                                            <td>
                                                                                <button onClick={() => { editRoom(item.id) }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                                                                <button onClick={() => { deleteRoom(item.id) }} className="btn btn-danger ms-2">Delete</button>
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

                        {/*  <!-- Modal --> */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{getRoom.room_name} || <span className="text-danger">Room Number : {getRoom.room_number}</span></h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleChange}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="status">
                                                    Status
                                                </label>
                                                <select
                                                    name="status"
                                                    id="status"
                                                    className="form-control"
                                                    value={getRoom?.status || "available"}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value="available">Available</option>
                                                    <option value="pre-booking">Pre-Booking</option>
                                                    <option value="booking">Booking</option>
                                                    <option value="available">Checkout</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Save Changes
                                            </button>
                                        </form>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        {/*   <button type="button" className="btn btn-primary">Save changes</button> */}
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

export default CreateRoom;