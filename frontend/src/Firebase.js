import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA69ysxObYEpK4LbpjGLa6Wb9xjfE0UWXQ",
  authDomain: "doubt-port.firebaseapp.com",
  projectId: "doubt-port",
  storageBucket: "doubt-port.appspot.com",
  messagingSenderId: "22871272546",
  appId: "1:22871272546:web:9ca1fcda21de279961353b",
  measurementId: "G-JTN8H2WFSZ"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export const auth=getAuth()
export const provider=new GoogleAuthProvider()
