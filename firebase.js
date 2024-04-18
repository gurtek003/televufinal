// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfPfTK4mOiLivSUqiHZfK48qYe5_RjNyY",
  authDomain: "webrtc-86f6c.firebaseapp.com",
  databaseURL: "https://webrtc-86f6c-default-rtdb.firebaseio.com",
  projectId: "webrtc-86f6c",
  storageBucket: "webrtc-86f6c.appspot.com",
  messagingSenderId: "449881809938",
  appId: "1:449881809938:web:7f35319f1508f4ed5d64cb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
