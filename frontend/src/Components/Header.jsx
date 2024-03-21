import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link> 
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link> {/* Replace <a> with Link */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/link">Link</Link> {/* Replace <a> with Link */}
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {/* Replace <a> with Link */}
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li> {/* Replace <a> with Link */}
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li> {/* Replace <a> with Link */}
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li> {/* Replace <a> with Link */}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</Link> {/* Replace <a> with Link */}
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
