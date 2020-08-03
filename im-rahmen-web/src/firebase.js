// src/firebase.js
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBlZDobEhnZwGGQ9zvcz_LTgD7L7Tv9WfY",
    authDomain: "im-rahmen.firebaseapp.com",
    databaseURL: "https://im-rahmen.firebaseio.com",
    projectId: "im-rahmen",
    storageBucket: "im-rahmen.appspot.com",
    messagingSenderId: "57266534282"
  };
  firebase.initializeApp(config);
export default firebase;