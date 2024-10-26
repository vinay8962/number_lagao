import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const token = Cookies.get("Token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "https://backend-lmrh.onrender.com/api/doctor/profile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [token]);

  return (
    <div className="profile-page bg-gray-50 p-8 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Doctor's Profile
        </h2>
        <div className="flex items-center justify-center mb-4">
          <img
            alt="Profile"
            src={
              profileData && profileData.profile_picture
                ? `https://backend-lmrh.onrender.com${profileData.profile_picture}`
                : "https://via.placeholder.com/150"
            }
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Name:</strong> {profileData?.user?.first_name || "Dr. Test"}{" "}
            {profileData?.user?.last_name || ""}
          </p>
          <p className="text-lg">
            <strong>Age:</strong> {profileData?.age || "N/A"}
          </p>
          <p className="text-lg">
            <strong>City:</strong> {profileData?.city || "N/A"}
          </p>
          <p className="text-lg">
            <strong>State:</strong> {profileData?.state || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Gender:</strong> {profileData?.gender || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Specialty:</strong> {profileData?.specialty || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Experience:</strong>{" "}
            {profileData?.experience_years || "N/A"} years
          </p>
          <p className="text-lg">
            <strong>Education:</strong>{" "}
            {profileData?.education?.[0]?.education || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Role:</strong> {profileData?.user?.role || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
