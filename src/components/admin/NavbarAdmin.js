import React from 'react'
import { Link } from "react-router-dom"
import img from "../../assets/img/Logo.svg"
import Cookies from "js-cookie"

function NavbarAdmin() {
    const logoutHandler = () => {
        localStorage.clear();
        window.location.href = "/";
        Cookies.remove("jwt", { path: "" });
    }

    return (
        <nav
            className="navbar navbar-desktop navbar-expand"
            style={{ zIndex: "2" }}
        >
            <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
                <ul className=" navbar-nav d-flex align-items-center justify-content-between">
                    <li className="nav-item ">
                        <Link className="navbar-brand nav-link mt-2" to="/dashboard">
                                <img src={img} alt="img" />
                        </Link>
                    </li>

                    <li className="nav-item mr-3">
                        <Link onClick={logoutHandler} className="nav-link" to="#">
                            Logout
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default NavbarAdmin
