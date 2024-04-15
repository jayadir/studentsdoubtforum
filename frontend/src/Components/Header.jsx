import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../Firebase";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/Slices/userSice";
export default function Header() {
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(removeUser());
        navigate("/login");
        // console.log('Logged out');
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            DoubtPort
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              isSmallScreen ? "" : "justify-content-between align-items-center"
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <div
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </div>
              </li>
              {isSmallScreen && (
                <>
                  <li key="profile" className="nav-item">
                    <Link className="nav-link" to="/">
                      Profile
                    </Link>
                  </li>
                  <li key="logout" className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            {!isSmallScreen && (
              <div className="nav-item dropdown">
                <button
                  className="btn btn-outline-secondary rounded-circle"
                  type="button"
                  id="profileDropdown"
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    showDropdown ? "show" : ""
                  }`}
                  aria-labelledby="profileDropdown"
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    transform: "translateX(-100%)",
                  }}
                >
                  <li>
                    <Link className="dropdown-item" to="/">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
