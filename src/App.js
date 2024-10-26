// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import NumberVarification from './pages/Auth/NumberVarification';
import Register from './pages/Auth/Register';
import MainDashboard from './pages/Dashboard/MainDashboard';
import Profile from './components/Profile';
import Setting from './components/Setting';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Home from './pages/Home';


const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/numbervarification" element={<NumberVarification />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<MainDashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
