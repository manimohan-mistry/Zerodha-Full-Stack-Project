import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


export default function Signup() {

    const signupUrl = process.env.REACT_APP_BACKEND_LOGIN_URL;

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        username: "",
        password: "",
    });
    const { email, username, password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                signupUrl,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            username: "",
            password: ""
        });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6" >
                    <form class=" g-3" onSubmit={handleSubmit}>
                        <div className="formControllDiv">
                            <div class=" mt-4">
                                <label for="email" class="form-label">Enter Email : </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    required
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div class=" mt-3">
                                <label for="username" class="form-label">Enter Username : </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="Enter Username"
                                    value={username}
                                    required
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div class=" mt-4">
                                <label for="password" class="form-label">Enter Password : </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    required
                                    value={password}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mt-2">
                                <div className="buttonClass">
                                    <button class="btn btn-primary mt-2"
                                        type="submit"
                                        style={{ borderRadius: "10px" }}>Register Now
                                    </button>
                                    <span style={{ color: "black", marginLeft: "1rem", marginTop: "1rem" }}>Already have an account <i class="fa-solid fa-arrow-right"></i> <Link to="/login"> Login Now</Link></span>
                                </div>
                            </div>

                        </div>
                    </form>
                    <ToastContainer />
                </div>
                <div className="col-3"></div>

            </div>
        </div>
    )
}