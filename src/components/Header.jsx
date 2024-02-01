import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const nevigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem("token")
    nevigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NoteBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              
            </ul>
            <div className="d-flex">
              {localStorage.getItem("token") ? (
                <button className="btn btn-outline-success mx-3" onClick={logout}>Logout</button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-outline-success mx-3">
                      Login
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button className="btn btn-outline-success mx-3">
                      SignUp
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
