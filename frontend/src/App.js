import Header from './Components/Header';
import './App.css';
import { BrowserRouter as Router, Link, Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import { userSelector } from './redux/Slices/userSice';
import {useSelector,useDispatch} from 'react-redux'
import {auth} from './Firebase'
import { useEffect } from 'react';
import {setUser,removeUser} from './redux/Slices/userSice'
function App() {
  const userstate=useSelector(userSelector)
  const dispatch=useDispatch()
  useEffect(() => {
  
     auth.onAuthStateChanged((user) => { 
      if (user) {
        dispatch(setUser({ 
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          isVerified: user.emailVerified
        }));
      }
      else{
        dispatch(removeUser());
      }
    });
  
    // return () => unsubscribe(); 
  }, [dispatch,auth]);
  
  return (
    
    <div className="App">
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
    
  );
}

export default App;
