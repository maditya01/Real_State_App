import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 100,
    discountedPrice: 100,
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;
  function onChange() {}
  return (
    <main className=" max-w-md m-auto px-2">
      <h1 className=" text-3xl text-center mt-6 font-bold">
        Create a Listing
      </h1>
      <form className="">
        <p className=" text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${
                type === "sale"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
          >
            Rent
          </button>
        </div>
        <p className=" text-lg mt-6 font-semibold">Name</p>
        <div>
          <input
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out 
            focus:border-slate-600 mb-6"
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            onChange={onChange}
            maxLength="32"
            minLength="10"
            required
          />
        </div>
        <div className="flex mb-6">
          <div>
            <p className=" text-lg font-semibold">Beds</p>
            <input
              className="text-center mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
            />
          </div>
          <div>
            <p className=" text-lg  font-semibold">Baths</p>
            <input
              className="text-center  ml-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out 
            focus:border-slate-600"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold">Parking Spot</p>
          <div className="flex">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            >
              YES
            </button>
            <button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            >
              NO
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold">Furnished</p>
          <div className="flex">
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${
                !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
            >
              YES
            </button>
            <button
              type="button"
              id="furnished"
              value={false}
              onClick={onChange}
              className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            >
              NO
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold">Address</p>
          <div>
            <textarea
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out 
            focus:border-slate-600"
              type="text"
              id="address"
              value={address}
              placeholder="Address"
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold">Description</p>
          <div>
            <textarea
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out 
            focus:border-slate-600"
              type="text"
              id="description"
              value={description}
              placeholder="Description"
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold">Offer</p>
          <div className="flex">
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onChange}
              className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            >
              YES
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onClick={onChange}
              className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
              ${offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
            >
              NO
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className=" text-lg font-semibold">Regular Price</p>
          <div className="flex space-x-6">
            <input
              className="text-center mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onChange}
              min="50"
              max="40000000"
              required
            />
            {type === "rent" && (
              <p className="text-md w-full whitespace-nowrap">$/Month</p>
            )}
          </div>
        </div>
        {offer && (
          <div className="mb-6">
            <p className=" text-lg font-semibold">
              Discounted Price
            </p>
            <div className="flex space-x-6">
              <input
                className="text-center mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onChange}
                min="50"
                max="40000000"
                required={offer}
              />
              {type === "rent" && (
                <p className="text-md w-full whitespace-nowrap">$/Month</p>
              )}
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className=" text-lg  font-semibold">Images</p>
          <p className="text-gray-600">The first image will be cover (max 6)</p>
          <input
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out"
            type="file"
            name=""
            id="images"
            onChange={onChange}
            accept=".png .jpg,.jpeg"
            multiple
            required
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 font-medium text-sm text-white uppercase rounded shadow-md hover:bg-blue-700 shadow:lg focus:bg-blue-700 shadow:lg"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
