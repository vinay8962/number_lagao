import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-500 text-black flex justify-end p-10">
      <NavLink to="/login">
        <h3 className="w-18 h-8 border border-gray-500">Login</h3>
      </NavLink>
    </nav>
  );
};

export default Home;
