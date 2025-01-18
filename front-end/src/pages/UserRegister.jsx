import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const UserRegister = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        axios
            .post("http://192.168.0.115:8000/api/user/add", {

                name: data.name,
                email: data.email,
                password: data.password


            })
            .then(() => {
                toast.success("user added successfully!");

            })
            .catch((error) => {
                console.log(error);
                toast.error("failed to user add");
            });
    }
    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                {/* <!-- Register Card --> */}
                <div className="card">
                    <div className="card-body">
                        {/* <!-- Logo --> */}

                        {/* <!-- /Logo --> */}
                        <h4 className="mb-2">User Register here 🚀</h4>
                        <p className="mb-4">Make your app management easy and fun!</p>

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
                                    id="password-default-fullname"
                                    placeholder="password"
                                />
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                                    <label className="form-check-label" htmlFor="terms-conditions">
                                        I agree to
                                        <a>privacy policy & terms</a>
                                    </label>
                                </div>
                            </div>


                            <input type="submit" className="btn btn-primary" />
                        </form>

                        <p className="text-center">
                            <span>Already have an account?</span>
                            <a href="auth-login-basic.html">
                                <span>Sign in instead</span>
                            </a>
                        </p>
                    </div>
                </div>
                {/* <!-- Register Card --> */}
            </div>
            <div className="content-backdrop fade"></div>
        </div>
    );
};

export default UserRegister;