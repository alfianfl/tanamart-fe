import React from 'react'
import { Link } from "react-router-dom"
import '../../assets/css/admin/artikelAdmin.css'

function SidebarAdmin() {
    return (
        <nav id="sidebar" className="navbar sidebar-desktop">
            <ul className="sidebar-bar">
                <li className="nav-item mb-2">
                    <Link className="nav-link" to="/">Transaksi</Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link" to="/dashboard/artikel">Artikel</Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link" to="/dashboard/user">User</Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link" to="/dashboard/produk">Produk</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarAdmin
