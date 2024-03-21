import React from "react";
import Sidebar from "./Sidebar";
import Mainpage from "./Mainpage";
export default function Homepage() {
    return (
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
             <Sidebar/>
            </nav>
            <div className="col-md-10">
              <Mainpage/>
            </div>
          </div>
        </div>
      );
  
}
