import React from "react";
import './css/Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Event Schedule</a></li>
                <li><a href="#">Bookings</a></li>
                <li><a href="#">Users</a></li>
            </ul>
        </nav>
    );
}
