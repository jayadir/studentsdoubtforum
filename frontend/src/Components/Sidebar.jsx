import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar vh-100">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Questions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Tags</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Jobs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Teams</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Developer Jobs Directory</a>
              </li>
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
