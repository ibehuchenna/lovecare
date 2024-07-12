import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"; // import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Icons */}
      <div className="social-media">
        <a href="https://www.facebook.com" className="icon-link">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </a>
        <a href="https://www.instagram.com" className="icon-link">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a href="https://www.twitter.com" className="icon-link">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
      </div>

      <hr className="divider" />

      <div className="footer-content">
        {/* Company Name and Description */}
        <div className="company-info">
          <h3>Love&Care</h3>
          <p>
            Your trusted source for accurate data and countdowns. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, autem!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio.
          </p>
        </div>

        {/* About Us */}
        <div className="about-us">
          <h4>About Us</h4>
          <p>
            We specialize in providing reliable countdown services for events, launches, and more.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, iure?
          </p>
        </div>

        {/* Contact Us */}
        <div className="contact-info">
          <h4>Contact Us</h4>
          <p>
            <a href="mailto:info@realcountdown.com" className="icon-link">
              <FontAwesomeIcon icon={faEnvelope} /> lcare7186@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+923499655567" className="icon-link">
              <FontAwesomeIcon icon={faPhone} /> +49 1573 5674196
            </a>
          </p>
        </div>
      </div>

      <hr className="divider" />

      <div className="footer-copyright">
        {/* Copyright Notice */}
        <p>©2024 Copyrights Love&Care. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
