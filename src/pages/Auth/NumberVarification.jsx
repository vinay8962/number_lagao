import React, { useState } from "react";
import axios from "axios";
import DrImage from "../../assets/Auth-Image/25872128_eldery_treatment_05.png";
import { MdOutlineLocalPhone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const NumberVerification = () => {
  const [phone_number, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // Function to handle sending OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-lmrh.onrender.com/api/send-otp/",
        { phone_number },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);

      // Save the phone number in sessionStorage
      sessionStorage.setItem("phone_number", phone_number);

      // Open the modal when the API call is successful
      setShowModal(true);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setShowModal(false);
    }
  };

  // Function to handle OTP verification
  const handleOtpVerification = async () => {
    // Retrieve the phone number from sessionStorage
    const storedPhoneNumber = sessionStorage.getItem("phone_number");

    try {
      const response = await axios.post(
        "https://backend-lmrh.onrender.com/api/verify-otp/",
        { phone_number: storedPhoneNumber, otp }, // Send both phone number and OTP
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/register");
      console.log("OTP Verification Success:", response.data);
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error.response ? error.response.data : error.message
      );
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row h-full md:h-[775px] bg-doctorLight font-poppins">
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
                Number Verification
              </h1>
              <p>to continue to your Evernote account.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="my-5 md:my-10">
            {/* Phone Number Input */}
            <div className="mb-5 md:mb-10">
              <label
                htmlFor="number"
                className="text-doctorDark text-lg md:text-xl"
              >
                Number
              </label>
              <div className="flex border border-gray-300 items-center p-2 rounded-md my-2 shadow-sm">
                <MdOutlineLocalPhone size={25} color="gray" />
                <input
                  type="number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="1234...."
                  className="w-full h-8 bg-transparent focus:outline-none px-2"
                  name="number"
                  id="number"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-2 mt-5 md:mt-10">
              <button
                type="submit"
                className="bg-doctorDark text-white w-full h-10 md:h-12 rounded-lg tracking-widest hover:bg-green-800 transition"
              >
                Send
              </button>
            </div>
          </form>

          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-black">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white w-96 h-72 p-8 rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold mb-6">Enter OTP</h2>

              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input {...props} className=" border border-gray-600" />
                )}
              />

              <button
                className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                onClick={handleOtpVerification}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberVerification;
