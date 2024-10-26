import React, { useState } from "react";
import DrImage from "../../assets/Auth-Image/25872128_eldery_treatment_05.png";
import DrLogo from "../../assets/Pharmacy logo - Made with PosterMyWall.jpg";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "patient", // default value
    password: "",
    confirmPassword: "",
  });
  const storedPhoneNumber = sessionStorage.getItem("phone_number");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, role, password, confirmPassword } =
      formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccessMessage("");
      return;
    }
    try {
      const response = await axios.post(
        "https://backend-lmrh.onrender.com/api/register/",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          role: role,
          password: password,
          phone_number: storedPhoneNumber,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setSuccessMessage("Registration successful!");
        setError("");
        // Optionally, redirect to the login page
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row h-full md:h-[775px] bg-doctorLight font-poppins">
      {/* Left Side (Form) */}
      <div className="w-full md:w-1/2 bg-doctorLight text-doctorDark flex justify-center items-center">
        <div className="w-11/12 md:w-10/12 h-auto md:h-5/6 p-6 md:p-10 shadow-lg rounded-lg bg-white">
          <div className="my-4 md:my-8">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold">
              Hi There 👋
            </h2>
          </div>
          <div className="mb-5 md:mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-doctorDark">
              Sign Up
            </h1>
            <p className="text-sm md:text-base">to continue to your account.</p>
          </div>

          <form className="my-5 md:my-8 space-y-4" onSubmit={handleSubmit}>
            {/* First and Last Name Inputs */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-8">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="text-doctorDark text-lg md:text-xl"
                >
                  First Name
                </label>
                <div className="flex border border-gray-300 items-center p-2 rounded-md shadow-sm mt-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full h-8 bg-transparent focus:outline-none px-2"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="text-doctorDark text-lg md:text-xl"
                >
                  Last Name
                </label>
                <div className="flex border border-gray-300 items-center p-2 rounded-md shadow-sm mt-2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-8 bg-transparent focus:outline-none px-2"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email and Role Inputs */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-8">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="text-doctorDark text-lg md:text-xl"
                >
                  Email
                </label>
                <div className="flex border border-gray-300 items-center p-2 rounded-md shadow-sm mt-2">
                  <MdOutlineMailOutline size={25} color="gray" />
                  <input
                    type="email"
                    placeholder="xyz@gmail.com"
                    className="w-full h-8 bg-transparent focus:outline-none px-2"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="role"
                  className="text-doctorDark text-lg md:text-xl"
                >
                  Role
                </label>
                <div className="flex gap-4 items-center mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      className="mr-2"
                      checked={formData.role === "patient"}
                      onChange={handleChange}
                    />
                    Patient
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      className="mr-2"
                      checked={formData.role === "doctor"}
                      onChange={handleChange}
                    />
                    Doctor
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-8">
              {/* Password Input */}
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-doctorDark text-lg md:text-xl"
                >
                  Password
                </label>
                <div className="flex border border-gray-300 items-center p-2 rounded-md shadow-sm mt-2">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-8 bg-transparent focus:outline-none px-2"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-doctorDark text-lg md:text-xl"
                >
                  Confirm Password
                </label>
                <div className="flex border border-gray-300 items-center p-2 rounded-md shadow-sm mt-2">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full h-8 bg-transparent focus:outline-none px-2"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            {/* Register Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-doctorDark text-white w-full h-10 md:h-12 rounded-lg tracking-widest hover:bg-green-800 transition"
              >
                Register
              </button>
            </div>
          </form>

          {/* Display Success or Error Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

          <div className="mt-6">
            <p className="text-center">
              Already registered?{" "}
              <Link
                to="/login"
                className="underline hover:text-red-600 font-medium"
              >
                Sign In
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
          className="w-4/5 h-64 md:h-4/5 rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
