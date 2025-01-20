import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const CreateRoom = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = () => {
        setLoading(true);
        axios
            .get("http://192.168.1.9:8000/api/room-category")
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
    // get form data
    const onSubmit = data => console.log(data);

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
                                                        type="number"
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
                                                                        <option key={item.id} value={item.name}>{item.name}</option>
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

                        {/* Categories Table */}
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Room Details</h5>
                                </div>
                                <div className="card-body">

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