import React, { useState } from "react";
import DrImage from "../../assets/Auth-Image/25872128_eldery_treatment_05.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie
import { toast } from "react-toastify"; // Import Toastify

const Login = () => {
  const [numberEmail, setNumberEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-lmrh.onrender.com/api/login/",
        {
          number_email: numberEmail,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);

      // Save the token in cookies
      Cookies.set("Token", response.data.token, { expires: 7 });

      // Show a success toast message
      toast.success(response.data.message);

      // Navigate based on user role
      if (response.data.role === "doctor") {
        navigate("/dashboard");
      } else {
        navigate("/some-other-route"); // Update with a valid route for other roles if needed
      }
    } catch (error) {
      console.error(error.response.data);

      // Show an error toast message
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row h-full md:h-[775px] bg-doctorLight font-poppins">
      {/* Toast Container for alerts */}

      {/* Left Side (Form) */}
      <div className="w-full md:w-1/2 bg-doctorLight text-doctorDark flex justify-center items-center">
        <div className="w-11/12 md:w-10/12 h-auto md:h-5/6 p-5 md:p-10 shadow-lg rounded-lg bg-white">
          <div className="my-5 md:my-10">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold">
              Hi There 👋
            </h2>
          </div>
          <div className="gap-2 mb-5 md:mb-10 flex justify-center text-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-doctorDark">
                Sign In
              </h1>
              <p>to continue to your Evernote account.</p>
            </div>
          </div>

          <form className="my-5 md:my-10" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-5 md:mb-10">
              <label
                htmlFor="email"
                className="text-doctorDark text-lg md:text-xl"
              >
                Email or Phone Number
              </label>
              <div className="flex border border-gray-300 items-center p-2 rounded-md my-2 shadow-sm">
                <MdOutlineMailOutline size={25} color="gray" />
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  className="w-full h-8 bg-transparent focus:outline-none px-2"
                  value={numberEmail}
                  onChange={(e) => setNumberEmail(e.target.value)}
                  name="number_email"
                  id="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-5 md:mb-10">
              <label
                htmlFor="password"
                className="text-doctorDark text-lg md:text-xl"
              >
                Password
              </label>
              <div className="flex border border-gray-300 items-center p-2 rounded-md my-2 shadow-sm">
                <IoKeyOutline size={25} color="gray" />
                <input
                  type="password"
                  placeholder="******"
                  className="w-full h-8 bg-transparent focus:outline-none px-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="p-2 mt-5 md:mt-10">
              <button className="bg-doctorDark text-white w-full h-10 md:h-12 rounded-lg tracking-widest hover:bg-green-800 transition">
                Login
              </button>
            </div>
          </form>
          <div>
            <p>
              Don't have an account{" "}
              <Link
                className="underline hover:text-red-600"
                to="/numbervarification"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={DrImage}
          alt="Doctor Equipment"
          className="w-4/5 h-64 md:h-4/5 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
