import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  // console.log(location)
  const navigate = useNavigate();
  const auth = getAuth();

  //Concept of Use-Effect is really important when we want to re-run the page without reloading and see the effect.
  //when auth state is changed we want to rerun the page Sign-in -> Profile me
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign-in");
      }
    });
  }, [auth]);
  function pathMatchRoute(path) {
    if (path === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                      border-b-[3px] border-b-transparent ${
                        pathMatchRoute("/") && "text-black border-b-red-500"
                      }
                      `}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                      border-b-[3px] border-b-transparent
                      ${
                        pathMatchRoute("/offers") &&
                        "text-black border-b-red-500"
                      }
                      `}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400
                      border-b-[3px] border-b-transparent  border-b-red-500
                      ${
                        (pathMatchRoute("/sign-in") ||
                          pathMatchRoute("/profile")) &&
                        "text-black border-b-red-500"
                      }
                      `}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
