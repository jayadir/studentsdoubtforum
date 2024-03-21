import logo from './logo.svg';
import Header from './Components/Header';
import './App.css';
import { BrowserRouter as Router, Link, Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

function App() {
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
