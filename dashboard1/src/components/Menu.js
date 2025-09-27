import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropDown, setIsProfileDropDown] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002",
          {},
          { withCredentials: true }
        );

        const { status, user } = data;

        if (status) {
          setUsername(user);
        }
      } catch (error) {
        console.error("Cookie verification failed:", error);
      }
    };

    verifyCookie();
  }, []);

  function handleMenuClick(index) {
    setSelectedMenu(index);
  }

  function handleProfileClick() {
    setIsProfileDropDown(!isProfileDropDown);
  }

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(5)}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
          {/* <li>
            <Link>Good to seen</Link>
          </li> */}
        </ul>
        <hr />
        <Link style={{ textDecoration: "none" }} to="/profile">
          <div className="profile" onClick={() => handleProfileClick}>
            <div className="avatar">User Profile</div>
            {/* <p className="username">User Info</p> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;