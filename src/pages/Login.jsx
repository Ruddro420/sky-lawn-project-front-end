import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
     // fetch data
     const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const onSubmit = (data) => {
        

        axios
            .post(`${BASE_URL}/user/check`, {
                email: data.email,
                password: data.password,
            })
            .then((response) => {
                
                if (response.data.status === "success") {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userData", JSON.stringify(response.data.data));
                    console.log(response.data.data);
                    toast.success(response.data.message);
                    reset();
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Something Went Wrong");
            });
    };

    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y d-flex align-items-center justify-content-center vh-100">
                <div className="card" style={{ width: "400px" }}>
                    <div className="card-body">
                        <h4 className="mb-2 text-center">Login Here!</h4>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            id="formAuthentication"
                            className="mb-3"
                            action="index.html"
                            method="POST"
                        >
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email or Username
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter your email or username"
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="mb-3 form-password-toggle">
                                <div className="d-flex justify-content-between">
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                <div className="input-group input-group-merge">
                                    <input
                                        {...register("password", { required: true })}
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password"
                                        required
                                    />
                                    <span className="input-group-text cursor-pointer">
                                        <i className="bx bx-hide"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <input type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
