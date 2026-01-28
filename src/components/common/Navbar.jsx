import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="#home">HOME</a></li>
                <li><a href="#skills">SKILLS</a></li>
                <li><a href="#certs">CERTIFICATES</a></li>
                <li><a href="#projects">PROJECTS</a></li>
                <li><a href="#socials">SOCIALS</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;