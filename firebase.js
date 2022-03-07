// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4EH9Fi8nZbti6mm2NsImah8SdEeg1Tbo",
  authDomain: "bump-dbce6.firebaseapp.com",
  databaseURL: "https://bump-dbce6-default-rtdb.firebaseio.com",
  projectId: "bump-dbce6",
  storageBucket: "bump-dbce6.appspot.com",
  messagingSenderId: "862474814273",
  appId: "1:862474814273:web:1735b8791ad1bc0500d7c0",
  measurementId: "G-9PMM6YNKYC"
};

// Initialize Firebase
 let app;
 if (firebase.apps.length===0) {
     app = firebase.initializeApp(firebaseConfig);
 } else {
     app = firebase.app()
 }

 //const analytics = firebase.getAnalytics();

 const auth = firebase.auth();
 const db = app.firestore();

 export { db, auth };
