import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              disabled
              type="text"
              id="name"
              value={name}
              className="mb-6 w-full px-4 py -2 text-xl text-gray-700
               bg-white border-gray-300 transition ease-in-out"
            />
            <input
              disabled
              type="email"
              id="email"
              value={email}
              className="mb-6 w-full px-4 py -2 text-xl text-gray-700
               bg-white border-gray-300 transition ease-in-out"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center">
                Do you want to change name?
                <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer ">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200  cursor-pointer "
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
