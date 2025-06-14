// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEyLYYFEvBy3jBEX5Omjc9nXOxlrLuV74",
  authDomain: "ai-bot-auth.firebaseapp.com",
  projectId: "ai-bot-auth",
  storageBucket: "ai-bot-auth.firebasestorage.app",
  messagingSenderId: "878207044671",
  appId: "1:878207044671:web:24341a17f573a5152dbc8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export {auth,googleProvider,githubProvider};