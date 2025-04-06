import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { localhostURL } from "./url";
import { showErrorToast, showSuccessToast } from "./Toastify/Toastifynotification";

export default function Login({ setOtpVerify }) {
  const navigate = useNavigate();
  const [value, setValue] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e, userType) => {
    e.preventDefault();

    let url = "";
    switch (userType) {
      case "user":
        url = `${localhostURL}LogInUser`;
        break;
      case "teacher":
        url = `${localhostURL}Shopkeeperlogin`;
        break;
      case "parent":
        url = `${localhostURL}Loginadmin`;
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(url, value);
      const { id, token, status, profileImg } = response.data;

      if (!status) return showErrorToast("Invalid credentials");

      if (userType === "user") {
        sessionStorage.setItem("Userid", id);
        sessionStorage.setItem("AcessToken", token);
        localStorage.setItem("profileImg", profileImg);
        navigate("/");
      } else if (userType === "teacher") {
        sessionStorage.setItem("ShopKeeperid", id);
        sessionStorage.setItem("ShopKeeperAcessToken", token);
        localStorage.setItem("profileImg", profileImg);
        setOtpVerify(true);
        navigate("/Viewdashboard");
      } else if (userType === "parent") {
        sessionStorage.setItem("Userid", id);
        sessionStorage.setItem("AcessToken", token);
        setOtpVerify(true);
        navigate("/Admindashboard");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.msg || "Something went wrong";

      if (errMsg === "Otp Verification Pending") {
        showErrorToast(errMsg);
        navigate(`/Otpverification/${error.response.data.id}`);
      } else {
        showErrorToast(errMsg);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 px-4">
      <div className="bg-zinc-800 bg-opacity-60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center tracking-wide">
          Welcome Back
        </h2>

        <form>
          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
            <input
              onChange={handleChange}
              name="userName"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={(e) => handleLogin(e, "user")}
              className="w-full py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition duration-300"
            >
              User Login
            </button>
            <button
              onClick={(e) => handleLogin(e, "teacher")}
              className="w-full py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition duration-300"
            >
              Teacher Login
            </button>
            <button
              onClick={(e) => handleLogin(e, "parent")}
              className="w-full py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition duration-300"
            >
              Parent Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
