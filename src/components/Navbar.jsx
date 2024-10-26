import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/Pharmacy logo - Made with PosterMyWall.jpg";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const dropdownRef = useRef(null);

  const token = Cookies.get("Token"); // Get token from cookies
  console.log("Token:", token);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) {
        console.error("Token is not available.");
        return;
      }

      try {
        const response = await axios.get(
          "https://backend-lmrh.onrender.com/api/doctor/profile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        // Handle the API response
        setProfileData(response.data);
        console.log("Profile data:", response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //console.log(profileData.profile_picture);
  return (
    <nav className="bg-doctorLight text-doctorDark p-4 px-10 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <img src={Logo} alt="Logo" className="w-7 h-7" />
        </h1>
        <div className="space-x-4 flex items-center">
          <div>
            <IoNotificationsOutline size={24} className="cursor-pointer" />
          </div>
          <div className="relative flex items-center gap-2" ref={dropdownRef}>
            <img
              alt="Profile"
              src={
                profileData && profileData.profile_picture
                  ? `https://backend-lmrh.onrender.com${profileData.profile_picture}`
                  : "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              className="inline-block h-8 w-8 rounded-full ring-2 ring-doctorDark cursor-pointer"
              onClick={toggleDropdown}
            />

            <h1 className="cursor-pointer" onClick={toggleDropdown}>
              Dr. {profileData ? profileData.user.first_name : "Dr. Test"}
            </h1>
            {/* Dropdown Menu with Framer Motion */}
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20"
              >
                <ul className="py-2 text-doctorDark">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) =>
                        isActive ? "ml-2 text-doctorLight" : "ml-2"
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <NavLink
                      to="/dashboard/setting"
                      className={({ isActive }) =>
                        isActive ? "ml-2 text-doctorLight" : "ml-2"
                      }
                    >
                      Setting
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 ml-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
