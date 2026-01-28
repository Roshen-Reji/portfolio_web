import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-top">
                <div className="footer-col">
                    <p>Computer Student<br />Enthusiast</p>
                </div>
                <div className="footer-col center-col">
                    <p>1st Year Student</p>
                    <a href="#projects" className="footer-link-u">View Work</a>
                </div>
                <div className="footer-col right-col">
                    <p>College of Engineering, Kidangoor</p>
                    <p>2026</p>
                </div>
            </div>

            <div className="footer-main">
                <h1 className="footer-name">Roshen Reji</h1>
            </div>

            <div className="footer-bottom">
                <div className="footer-contact">
                    <a href="#" className="footer-link">Contact</a>
                    <a href="mailto:roshen09.edu@gmail.com" className="footer-link">roshen09.edu@gmail.com</a>
                </div>
                <div className="footer-legal">
                    <span>© 2025 Roshen Reji. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;