import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "",
  authDomain: "doubt-port.firebaseapp.com",
  projectId: "doubt-port",
  storageBucket: "doubt-port.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth()
export const provider=new GoogleAuthProvider()
