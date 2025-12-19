import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Social Links */}
        <div className="footer-section">
          <div className="footer-logo">
            <h2>ElevAIte</h2>
          </div>
          <p className="footer-about">
            We are a passionate team of designers and developers creating beautiful digital experiences.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#hero">Home</a></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-links">
            <li><Link to="/services/web-development">Web  App Development</Link></li>
            <li><Link to="/services/mobile-apps">Mobile App Developemnt</Link></li>
            <li><Link to="/services/ui-ux-design">AI agent &  Chatbot</Link></li>
            <li><Link to="/services/digital-marketing">AI automation</Link></li>
            <li><Link to="/services/cloud-solutions">AI content creation</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} ElevAIte Labs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
