import React, { useState } from "react";
// import { Google } from "@mui/icons-material";

export default function Login() {
  const [register, setregister] = useState(false);
  return (
    <div>
      <div className="container mt-5">
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
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                    {!register ? (
                      <div
                        className="m-2 text-primary"
                        onClick={() => setregister(true)}
                        style={{ cursor: "pointer" }}
                      >
                        <u>click here to register</u>
                      </div>
                    ) : (
                      <div
                        className="m-2 text-primary"
                        onClick={() => setregister(false)}
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
              >
                {/* <Google className="me-2" /> */}
                Login with Google
              </button>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
