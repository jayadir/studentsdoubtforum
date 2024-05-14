import Header from "./Components/Header";
import "./App.css";
import { messaging } from "./Firebase";
import {getToken} from "firebase/messaging"
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import { userSelector } from "./redux/Slices/userSice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./Firebase";
import { useEffect } from "react";
import { setUser, removeUser } from "./redux/Slices/userSice";
import Cookies from "js-cookie";
import axios from "axios";
function App() {
  const userState = useSelector(userSelector);
  const dispatch = useDispatch();
  function requestPermission(){
    Notification.requestPermission().then(async (permission)=>{
      if(permission==="granted"){
        const token=await  getToken(messaging,{vapidKey:"BEbROURb9cr2YX6-COQ70FFl14vhhXBuSArRuQjsITHphcNnc_SsqmnThQsPdCAqAbxlEtqAdhPYUHVMsJHcEM4"})
        console.log(token)
        const res=await axios.post("/api/subscribe",{
          token:token,
          topic:"newQuestion"
        })
      }else{
        console.log("Notification permission denied.")
      }
    })
  }
  useEffect(() => {
    const uidCookie = Cookies.get("uid");
    const jwt=Cookies.get("jwt")
    // console.log(uidCookie)
    if (uidCookie) {
      axios.get(`/api/User?userId=${uidCookie}`,{
        headers:{
          Authorization:`Bearer ${jwt}`
        }
      }).then((res) => {
        // console.log("res ",res)
        dispatch(
          setUser({
            uid: res.data.data[0].userId,
            name: res.data.data[0].name,
            email: res.data.data[0].email,
            
            // organisation: res.data.data[0].organisation,
            // isVerified: res.data.data.isVerified
          })
        );
      });
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            isVerified: user.emailVerified,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true);

        Cookies.set("jwt", token, { expires: 1 });
      } else {
        Cookies.remove("token");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    requestPermission()
  },[])
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
