import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const UserRegister = () => {
    const { register, handleSubmit,reset } = useForm();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [visibility, setVisibility] = useState({});

    const onSubmit = (data) => {
        axios
            .post("http://192.168.0.115:8000/api/user/add", {
                name: data.name,
                email: data.email,
                password: data.password,
            })
            .then(() => {
                toast.success("user added successfully!");
                fetchCategories();
                reset()
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something Went Wrong or Email already Exits");
            });
    }
    // Fetch categories
    const fetchCategories = () => {
        setLoading(true);
        axios
            .get("http://192.168.0.115:8000/api/user")
            .then((response) => {
                setUsers(response.data.data);
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

    // Delete a category
    const deleteData = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios
                .get(`http://192.168.0.115:8000/api/user/delete/${id}`)
                .then(() => {
                    toast.success("Deleted successfully!");
                    fetchCategories(); // Refresh the category list
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to delete !");
                });
        }
    };

    // visibility
    const toggleVisibility = (index) => {
        setVisibility((prev) => ({ ...prev, [index]: !prev[index] }));
    };
    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    {/* <!-- Register Card --> */}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                {/* <!-- /Logo --> */}
                                <h4 className="mb-2">User Register here</h4>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="name-default-fullname">
                                            User Name
                                        </label>
                                        <input
                                            {...register("name", { required: true })}
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            id="name-default-fullname"
                                            placeholder="User Name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="email-default-fullname">
                                            Email
                                        </label>
                                        <input
                                            {...register("email", { required: true })}
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            id="email-default-fullname"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="password-default-fullname">
                                            Password
                                        </label>
                                        <input
                                            {...register("password", { required: true })}
                                            name="password"
                                            type="password"
                                            className="form-control"
                                           
                                            placeholder="password"
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-primary" />
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <!-- user details --> */}
                    <div className="col-12 mt-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5>User Details</h5>
                                <div className="col-12">
                                    <div className=" mb-4">
                                        <div className="">
                                            {loading ? (
                                                <p>Loading...</p>
                                            ) : (
                                                <div className="table-responsive text-nowrap border">
                                                    {
                                                        users.length == 0 ? <div className="alert alert-warning" role="alert">
                                                            No Data Found
                                                        </div> : <table className="table order-4">
                                                            <thead>
                                                                <tr>
                                                                    <th>Email</th>
                                                                    <th>Password</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="table-border-bottom-0">
                                                                {users.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.email} </td>
                                                                        <td>{visibility[index] ? item.password : "••••••••••••••••"}
                                                                            <i
                                                                                className={`bx ${visibility[index] ? "bx-show" : "bx-hide"} ms-2`}
                                                                                onClick={() => toggleVisibility(index)}
                                                                            ></i>
                                                                        </td>
                                                                        <td>
                                                                            <button onClick={() => { deleteData(item.id) }} className="btn btn-danger ms-2">Delete</button>
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
                </div>
            </div>
            <div className="content-backdrop fade"></div>
        </div>
    );
};

export default UserRegister;