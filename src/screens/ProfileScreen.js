import React from "react";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const { userData } = useSelector(({ auth }) => auth);

  return (
    <div className="profile-page">
      <h2>Personal profile</h2>
      <div>Omg!</div>
    </div>
  );
};

export default ProfileScreen;
