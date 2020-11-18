import firebase from 'firebase';
require('@firebase/firestore')

 var firebaseConfig = {
    apiKey: "AIzaSyBupwz69atTX7sdbQX04Uv2RVRUwRN0Q7s",
    authDomain: "story-hub-6be98.firebaseapp.com",
    databaseURL: "https://story-hub-6be98.firebaseio.com",
    projectId: "story-hub-6be98",
    storageBucket: "story-hub-6be98.appspot.com",
    messagingSenderId: "401586458899",
    appId: "1:401586458899:web:85b9066761cd18a6e58ae6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();