import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BackendUrl = process.env.REACT_APP_BACKEND;
const FrontendUrl = process.env.REACT_APP_FRONTEND;
// console.log(FrontendUrl);

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        BackendUrl,
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), window.location.href=FrontendUrl);
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    window.location.href="http://localhost:3000/login";
  };

  // const user = JSON.parse(localStorage.getItem(user));
  return (
    <>
      <div className="home_page text-center">
        <h4>
          {" "}
          Welcome :- <span style={{color:"orange"}}>{username}</span>
        </h4>
        <button className="btn bg-primary" onClick={Logout} style={{borderRadius:"10px"}}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;