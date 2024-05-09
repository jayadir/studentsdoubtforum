import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth, provider } from "../../Firebase";

export default function Login() {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  // Function to set a cookie with a given name, value, and expiration date
  const setCookie = (name, value, expires) => {
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  };
  const handleAlertClose = () => {
    setAlert("");
  };
 
  const googleSignin = () => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, provider)
        .then((response) => {
          navigate("/");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const emailSignIn = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill all the fields");
      return;
    }
    setLoading(true);
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          if (res.user.emailVerified) {
            console.log(res);
            setLoading(false);
            setEmail("");
            setPassword("");
            const expires = new Date();
            expires.setDate(expires.getDate() + 1);
            setCookie("jwt", res.user.accessToken, expires);
            setCookie("uid", res.user.uid, expires);
            navigate("/");

          } else {
            setAlert("Please verify your email before signing in.");
            setLoading(false);
            signOut(auth).then(() => {
              console.log("User signed out");
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert(err.message);
          setLoading(false);
        });
    });
  };

  return (
    <div>
      {alert && (
        <div className="d-flex align-items-center justify-content-center mt-2 mb-0">
          <div
            className="d-flex align-items-center justify-content-between alert alert-danger"
            role="alert"
          >
            {alert}
            <button
              type="button"
              className="btn-close mx-2"
              onClick={handleAlertClose}
            ></button>
          </div>
        </div>
      )}
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form>
                  {/* {register && (
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )} */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-center">
                      <>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={emailSignIn}
                          disabled={loading}
                        >
                          Login
                        </button>
                      </>
                    </div>
                    {!register && (
                      <div
                        className="m-2 text-primary"
                        onClick={() => navigate("/createprofile")}
                        style={{ cursor: "pointer" }}
                      >
                        <u>click here to register</u>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <hr className="flex-grow-1 mx-2" />
              <span>OR</span>
              <hr className="flex-grow-1 mx-2" />
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "#4285F4",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#1A73E8";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#4285F4";
                }}
                onClick={googleSignin}
              >
                Login with Google
              </button>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
