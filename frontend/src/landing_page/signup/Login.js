import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


export default function Login() {

    const loginURl = process.env.REACT_APP_BACKEND_LOGIN_URL;
    const dashboardUrl = process.env.REACT_APP_DASHBOARD_CONNECT;
    
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
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
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                loginURl,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    window.location.href = dashboardUrl;
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
            password: "",
        });
    };
    return (
        <div className="conatiner">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form className="g-3" onSubmit={handleSubmit}>
                        <div className="formControllDiv">
                            <div class=" mt-4">
                                <label for="email" class="form-label">Enter Your Email : </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    required
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div class=" mt-4">
                                <label for="password" class="form-label">Enter Your Password : </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Your Password"
                                    required
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mt-2">
                                <div className="buttonClass">
                                    <button
                                        class="btn btn-primary mt-2"
                                        type="submit" style={{ borderRadius: "10px" }}>Login Now</button>
                                    <a
                                        style={{ color: "black", marginLeft: "1rem", marginTop: "1rem" }}
                                    >Don't Have an Account <i class="fa-solid fa-arrow-right"></i>
                                        <Link to="/signup"> Register Now
                                        </Link>
                                    </a>
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