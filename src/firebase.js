// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"; //Add SDK For Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClBOOs7sTIB-hur8Std2hEofn5cl8dIgY",
  authDomain: "real-state-app-96ee5.firebaseapp.com",
  projectId: "real-state-app-96ee5",
  storageBucket: "real-state-app-96ee5.appspot.com",
  messagingSenderId: "1003721930879",
  appId: "1:1003721930879:web:07ba50bbabe5444e57274a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
