import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const CreateRoom = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    const [category, setCategory] = useState([]);
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getRoom, setGetRoom] = useState('');
    const [status, setStatus] = useState();
    const [getUpdateRoom, setGetUpdateRoom] = useState('');
    // fetch data
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchCategories = () => {
        setLoading(true);
        axios
          .get(`${BASE_URL}/room-category`)
          .then((response) => {
            setCategory(response.data || []); // Handle null response
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
            setLoading(false);
          });
      };
      
      const fetchRoom = () => {
        setLoading(true);
        axios
          .get(`${BASE_URL}/room/data`)
          .then((response) => {
            setRoom(response.data || []); // Handle null response
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching rooms:", error);
            setLoading(false);
          });
      };
      
      useEffect(() => {
        fetchCategories();
      }, []);
      
      useEffect(() => {
        fetchRoom();
      }, []);
      
    // get form data
    const onSubmit = (data) => {
        console.log(data);
        
        axios
            .post(`${BASE_URL}/room/add`, {
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
                .get(`${BASE_URL}/room/delete/${id}`)
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
            .post(`${BASE_URL}/room/update/status`, {
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

    // get update room 
   /*  const updateRoom = (id) => {
        const data = room.find(item => item.id == id)
        setGetUpdateRoom(data);
        setValue("room_name", data.room_name);
        setValue("room_number", data.room_number);
        setValue("price", data.price);
        setValue("feature", data.feature);
        setValue("room_category_id", data.room_category_id);
    } */
    // update room 
   /*  const onUpdateSubmit = (data) => {
        console.log(data);
        
        // Create FormData object for file uploads
        const formData = new FormData();

        // Append all fields to FormData
        formData.append("id", getUpdateRoom.id);
        formData.append("room_name", data.rname);
        formData.append("room_number", data.rnumber);
        formData.append("price", data.rprice);
        formData.append("feature", data.rfeature);
        formData.append("room_category_id", data.rcategory);
        // call api
        axios
            .post(`${BASE_URL}/room/update`, formData)
            .then(() => {
                toast.success("Update successfully!");
                //setGetCategory("");
                fetchCategories(); // Refresh the category list
                fetchRoom();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something Went Wrong!");
            });
    } */




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
                                                            category?.map(item => {
                                                                return (
                                                                    <>
                                                                        <option key={item.id} value={item.id}>{item?.name}</option>
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
                                                            category?.length == 0 ? <div className="alert alert-warning" role="alert">
                                                                No Data Found
                                                            </div> : <table className="table order-4 border">
                                                                <thead>
                                                                    <tr>
                                                                        <th>SL</th>
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
                                                                    {room?.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>{index+1} </td>
                                                                            <td>{item?.room_number} </td>
                                                                            <td>{item?.room_name} </td>
                                                                            <td>{item?.category.name} </td>
                                                                            <td>{item?.price} </td>
                                                                            <td>{item?.feature} </td>
                                                                            <td>{item?.status} </td>
                                                                            <td>
                                                                                <button onClick={() => { editRoom(item.id) }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                                                                <button onClick={() => { deleteRoom(item.id) }} className="btn btn-danger ms-2">Delete</button>
                                                                               {/*  <button
                                                                                    onClick={() => { updateRoom(item.id) }}
                                                                                    className="btn btn-success ms-2"
                                                                                    data-bs-toggle="modal" data-bs-target="#updateModal"
                                                                                >Update</button> */}
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

                        {/*  <!-- Edit Modal --> */}
                        {/* <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{getUpdateRoom.room_name} || <span className="text-danger">Room Number : {getUpdateRoom.room_number}</span></h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit(onUpdateSubmit)}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="status">
                                                    Room Name
                                                </label>
                                                <input
                                                    {...register("rname", { required: true })}
                                                    type="text"
                                                    className="form-control"
                                                    name="room_name"

                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="status">
                                                    Room Category
                                                </label>
                                                <select
                                                   
                                                    name="rcategory"
                                                    id="room_category_id"
                                                    className="form-control"
                                                    value={getUpdateRoom?.room_category_id || ""}
                                                    onChange={(e) => setValue("room_category_id", e.target.value)}
                                                >

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
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="status">
                                                    Room Number
                                                </label>
                                                <input
                                                    {...register("rnumber", { required: true })}
                                                    type="text"
                                                    className="form-control"
                                                    name="room_number"

                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="status">
                                                    Room Price
                                                </label>
                                                <input
                                                    {...register("rprice", { required: true })}
                                                    type="text"
                                                    className="form-control"
                                                    name="price"

                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="status">
                                                    Room Feature
                                                </label>
                                                <input
                                                    {...register("rfeature", { required: true })}
                                                    type="text"
                                                    className="form-control"
                                                    name="feature"

                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Save Changes
                                            </button>
                                        </form>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                       
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="content-backdrop fade"></div>
            </div>
        </div>
    );
};

export default CreateRoom;