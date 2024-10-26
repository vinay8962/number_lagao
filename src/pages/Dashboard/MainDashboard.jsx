// MainDashboard.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const MainDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex pt-16 w-full">
        {/* Pass isSidebarOpen and toggleSidebar as props */}
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <motion.main
          animate={{ marginLeft: isSidebarOpen ? "16rem" : "4rem" }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex-1 p-4 w-full"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default MainDashboard;
