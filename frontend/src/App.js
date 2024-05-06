import Header from './Components/Header';
import './App.css';
import { BrowserRouter as Router, Outlet } from 'react-router-dom';
import { userSelector } from './redux/Slices/userSice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './Firebase';
import { useEffect } from 'react';
import { setUser, removeUser } from './redux/Slices/userSice';

function App() {
  const userState = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            isVerified: user.emailVerified
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

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
