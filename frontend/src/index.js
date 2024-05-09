import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Components/Homepage";
import CreateQuestion from "./Components/CreateQuestion";
import Answer from "./Components/Answer";
import Login from "./Components/Auth/Login";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import CreateUserProfile from "./Components/Profile/CreateUserProfile";
import UserProfile from "./Components/Profile/UserProfile";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:title",
        element: (
          <ProtectedRoute>
            {" "}
            <Homepage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ask",
        element: (
          <ProtectedRoute>
            <CreateQuestion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/answer/:questionId",
        element: (
          <ProtectedRoute>
            {" "}
            <Answer />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createprofile",
        element: <CreateUserProfile />,
      },
      {
        path: "/profile/:uid",
        element: (
          
            <UserProfile/>
         
        ),
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
