import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  function onInputChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 mx-w-6xl mx-auto">
        <div className="w-full md:w-[67%] lg:w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onInputChange}
              placeholder="Full Name"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-400 bg-white border-gray-300 rounded  "
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={onInputChange}
              placeholder="Email Address"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-400 bg-white border-gray-300 rounded  "
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onInputChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-400 bg-white border-gray-300 rounded  "
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between">
              <p>
                Have an Account?
                <Link to="/sign-in" className="ml-1 text-red-500">
                  Sign in
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="ml-1 text-blue-600">
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              className="mt-6 shadow-md bg-blue-600 w-full text-white py-3 px-7 text-sm font-medium uppercase rounded hover:bg-blue-800"
              type="submit"
            >
              Sign Up
            </button>
            <div className="my-4">
              <p className="text-center font-semibold">OR</p>
            </div>
          </form>
          <OAuth />
        </div>
      </div>
    </section>
  );
};
export default SignUp;
