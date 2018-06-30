import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyAt4FGnAM8W3EWjxJGbN6Yhf5dS__cjS-Y",
  authDomain: "nushares-e09d1.firebaseapp.com",
  databaseURL: "https://nushares-e09d1.firebaseio.com",
  projectId: "nushares-e09d1",
  storageBucket: "nushares-e09d1.appspot.com",
  messagingSenderId: "1084053177721"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();


export {
  db,
  auth,
};
