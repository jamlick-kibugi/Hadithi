// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAy9I5pm91w6GhBipWfRL4dsTBh1vpmEA4",
    authDomain: "storyb-b4216.firebaseapp.com",
    projectId: "storyb-b4216",
    storageBucket: "storyb-b4216.appspot.com",
    messagingSenderId: "749773466683",
    appId: "1:749773466683:web:2c4abeae27732a05af801e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)