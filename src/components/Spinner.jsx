import React from "react";
import spinner from "../assets/svg/spinner.svg";
const Spinner = () => {
  return (
    <div>
      <div className="bg-black bg-opacity-5 flex items-center justify-center  mx-auto fixed left-0 right-0 top-0 bottom-0 z-50">
        <img src={spinner} alt="Loading..." className="h-24" />
      </div>
    </div>
  );
};

export default Spinner;
