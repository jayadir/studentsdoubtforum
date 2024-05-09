import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../Firebase";
import axios from "axios";
const CreateUserProfile = () => {
  const [email, setEmail] = useState("");
  // const [userDetails, setUserDetails] = useState({});
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [username, setUsername] = useState("");
  const [qualification, setQualification] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState("");
  const navigate = useNavigate();
  const emailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      email === "" ||
      password === "" ||
      name === "" ||
      username === "" ||
      qualification === "SELECT" ||
      gender === "" ||
      organization === "SELECT"
    ) {
      setAlert("Please fill all the fields");
      setLoading(false);
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
      const userDetails = {
        email: email,
        name: name,
        username: username,
        qualification: qualification,
        gender: gender,
        organization: organization,
        userId: usercred.user.uid,
      };
      try {
        const res = await axios.post("/api/User", userDetails);
      } catch (error) {
        console.error("Error adding user to MongoDB:", error);
        setAlert("Error creating user. Please try again later.");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setAlert("This email is already registered. Please login.");
      } else {
        setAlert("Error creating user. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   async function postDetails() {
  //     if (userDetails !== null || userDetails !== {}) {
  //       try {
  //         const res = await axios.post("/api/User", userDetails);
  //       } catch (error) {
  //         console.error("Error adding user to MongoDB:", error);
  //         // setAlert("Error creating user. Please try again later.");
  //       }
  //     }
  //   }
  //   postDetails();
  // }, [userDetails]);
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user && user.emailVerified && userDetails.email) {
  //       try {
  //         const res = await axios.post("/api/User", userDetails);
  //         console.log(res);
  //         setAlert("User created successfully");
  //         setUserDetails({});
  //         navigate("/login");

  //       } catch (error) {
  //         console.error("Error adding user to MongoDB:", error);
  //         setAlert("Error creating user. Please try again later.");
  //       }
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [userDetails]);

  const handleAlertClose = () => {
    setAlert("");
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
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
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="firstName">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="lastName">
                          Username
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline">
                        <select
                          className="form-control form-control-lg"
                          id="qualification"
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                        >
                          <option>SELECT</option>
                          <option>Student</option>
                          <option>Instructor</option>
                          <option>Working Professional</option>
                        </select>
                        <label htmlFor="qualification" className="form-label">
                          Qualification
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h6 className="mb-2 pb-1">Gender: </h6>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="femaleGender"
                          value="Female"
                          checked={gender === "Female"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="femaleGender"
                        >
                          Female
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="maleGender"
                          value="Male"
                          checked={gender === "Male"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="maleGender"
                        >
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="otherGender"
                          value="Other"
                          checked={gender === "Other"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="otherGender"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <select
                          className="form-control form-control-lg"
                          id="organization"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                        >
                          <option>SELECT</option>
                          <option>Organization 1</option>
                          <option>Organization 2</option>
                          <option>Organization 3</option>
                        </select>
                        <label htmlFor="organization" className="form-label">
                          Organization
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 mx-auto d-flex justify-content-center pt-2">
                    <input
                      className="btn btn-primary w-50 mx-auto btn-lg"
                      type="submit"
                      value="Submit"
                      onClick={emailSignUp}
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    {" "}
                    <p
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Already have an account? Login{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateUserProfile;
