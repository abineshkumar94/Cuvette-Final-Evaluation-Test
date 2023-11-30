import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./logout.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = ({ parent, userDetails }) => {
  const navigate = useNavigate();
  const backendurl = `https://wild-blue-crayfish-tutu.cyclic.app/api/v1/logout`;

  const handleLogout = () => {
    const loggedOut = axios.get(backendurl);
    toast.info("Logged out!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (parent === "home") {
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.reload();
      navigate("/");
    } else {
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  };

  return (
    <div className={styles.logoutContainer}>
    
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
      <ToastContainer />
    </div>
  );
};

export default Logout;
