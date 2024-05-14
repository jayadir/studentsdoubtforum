import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function Sidebar() {
  const [userDetails, setUserDetails] = useState({});
  const uid = Cookies.get("uid");
  useEffect(() => {
    const newToken = Cookies.get("jwt");
    axios
      .get(`/api/User?userId=${uid}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data.data[0]);
        console.log("side bar",res.data.data[0])
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar vh-100">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Questions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tags
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/polls/${userDetails._id}`}>
                  Polls
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/organisation/${userDetails?.organization?.replace(
                    /\s/g,
                    "_"
                  )}`}
                >
                  Organisation
                </Link>{" "}
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Teams</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Developer Jobs Directory</a>
              </li> */}
              {/* Add more sidebar items as needed */}
            </ul>
          </div>
        </nav>
        {/* <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
hello        </main> */}
      </div>
    </div>
  );
}

export default Sidebar;
