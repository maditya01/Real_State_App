import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  //Geolocation API is enabled or not
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
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
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
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
    latitude,
    longitude,
    images,
  } = formData;
  function onChange(e) {
    //All the input comes as an string.

    let boolean = null;
    //For boolean variable change it to boolean.
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevS) => ({
        ...prevS,
        images: e.target.files,
      }));
    }
    //text,number,boolean
    if (!e.target.files) {
      setFormData((prevS) => ({
        ...prevS,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to  be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum images needs to  be less than or equal to 6");
      return;
    }
    let geolocation = {};
    if (geolocationEnabled) {
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid} - ${
          image.name
        } - ${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Image is not uploaded");
      return;
    });
    console.log(imageUrls);
    const formDataCopy = {
      ...formData,
      imageUrls,
      geolocation,
      timestamp: serverTimestamp(),
      //Add a particular user who creates a listing
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    console.log(formDataCopy);
    //Her i was getting an error missing firebase permission
    //Added this line-> allow read, write: if request.time > timestamp.date(2020, 9, 10);
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    console.log(docRef);
    setLoading(false);
    toast.success("Listing created successfully");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md m-auto px-2">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
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
        <p className="text-lg mt-6 font-semibold">Name</p>
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
            <p className="text-lg font-semibold">Beds</p>
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
            <p className="text-lg  font-semibold">Baths</p>
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
          <p className="text-lg font-semibold">Parking Spot</p>
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
          <p className="text-lg font-semibold">Furnished</p>
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
        {!geolocationEnabled && (
          <div className="flex space-x-6 mb-4">
            <div>
              <p className=" text-lg font-semibold">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                min="-90"
                max="90"
                onChange={onChange}
                required
                className="text-center  w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Longitude</p>
              <input
                type="number"
                id="longitude"
                min="-180"
                max="180"
                value={longitude}
                onChange={onChange}
                required
                className="text-center w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
              />
            </div>
          </div>
        )}
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
            <p className="text-lg font-semibold">Discounted Price</p>
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
          <p className="text-lg  font-semibold">Images</p>
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
