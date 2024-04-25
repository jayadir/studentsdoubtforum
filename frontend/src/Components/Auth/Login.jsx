import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth, provider } from "../../Firebase";
import { set } from "mongoose";

export default function Login() {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAlertClose = () => {
    setAlert(null);
  };
  const googleSignin = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        navigate("/");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emailSignIn = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill all the fields");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.message);
        setLoading(false);
      });
  };

  const emailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === "" || password === "" || name === "") {
      // alert("Please fill all the fields");
      setAlert("Please fill all the fields");
      return;
    }
    try {
      const usercred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const status = await sendEmailVerification(usercred.user);
      setAlert(
        "Verification email sent. Please verify your email & login again."
      );
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      console.log(usercred);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setAlert("This email is already registered. Please login.");
      }
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
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
                  {register && (
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
                  )}
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
                      {register ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                          onClick={emailSignUp}
                        >
                          Register
                        </button>
                      ) : (
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
                      )}
                    </div>
                    {!register ? (
                      <div
                        className="m-2 text-primary"
                        onClick={() => setRegister(true)}
                        style={{ cursor: "pointer" }}
                      >
                        <u>click here to register</u>
                      </div>
                    ) : (
                      <div
                        className="m-2 text-primary"
                        onClick={() => setRegister(false)}
                        style={{ cursor: "pointer" }}
                      >
                        <u>click here to login</u>
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
