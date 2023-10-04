// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuIsa5CcCmRVAke9n_peaBMBFSzlafIJc",
  authDomain: "react-practice-d111f.firebaseapp.com",
  projectId: "react-practice-d111f",
  storageBucket: "react-practice-d111f.appspot.com",
  messagingSenderId: "938034445724",
  appId: "1:938034445724:web:57329210f47325170f1c59",
  measurementId: "G-TLEDH362CT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
