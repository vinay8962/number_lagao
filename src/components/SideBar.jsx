// SideBar.js
import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaHospital } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <motion.aside
      initial={{ width: isOpen ? "16rem" : "4rem" }}
      animate={{ width: isOpen ? "16rem" : "4rem" }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`bg-doctorLight text-white h-screen mt-[5px] fixed top-14 left-0 z-10`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-5 text-doctorDark"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <FaArrowLeftLong size={24} />
        ) : (
          <FaArrowRightLong size={24} />
        )}
      </button>

      <ul className="mt-12 space-y-4 text-doctorDark font-serif">
        <li className="flex items-center px-4 h-10 hover:bg-doctorDark hover:text-doctorLight">
          <FaCalendarAlt className="mr-2" size={24} />
          {isOpen && <span className="ml-2">Appointments</span>}
        </li>
        <li className="flex items-center px-4 h-10 hover:bg-doctorDark hover:text-doctorLight">
          <FaUser className="mr-2" size={24} />
          {isOpen && <span className="ml-2">Patients</span>}
        </li>
        <li className="flex items-center px-4 h-10 hover:bg-doctorDark hover:text-doctorLight">
          <FaHospital className="mr-2" size={24} />
          {isOpen && <span className="ml-2">Hospital</span>}
        </li>
      </ul>
    </motion.aside>
  );
};

export default SideBar;
