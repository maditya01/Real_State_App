import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  function onInputChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      navigate("/sign-in")
    } catch (error) {
      toast.error("Could not send reset password link");
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 mx-w-6xl mx-auto">
        <div className="w-full md:w-[67%] lg:w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onInputChange}
              placeholder="Email Address"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-400 bg-white border-gray-300 rounded  "
            />
            <div className="flex justify-between">
              <p>
                Don't Have an Account?
                <Link to="/sign-up" className="ml-1 text-red-500">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/sign-in" className="ml-1 text-blue-600">
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="mt-6 shadow-md bg-blue-600 w-full text-white py-3 px-7 text-sm font-medium uppercase rounded hover:bg-blue-800"
              type="submit"
            >
              Send Reset Password
            </button>
            <div className="my-4">
              <p className="text-center font-semibold">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPass;
