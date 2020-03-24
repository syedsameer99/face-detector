import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDaaQoFn3GZLAZRJpHmTEZ9Z8sEizJvTHQ",
  authDomain: "face-detector-b5086.firebaseapp.com",
  databaseURL: "https://face-detector-b5086.firebaseio.com",
  projectId: "face-detector-b5086",
  storageBucket: "face-detector-b5086.appspot.com",
  messagingSenderId: "883396809875",
  appId: "1:883396809875:web:3482da1ebc3ac06cd1e966",
  measurementId: "G-XB302MS6WM"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
