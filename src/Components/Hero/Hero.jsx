import React from "react";
import "./Hero.css"; // Import CSS file for styling
import heroImage from '../../assets/hero-image.svg'; // Import hero image

const Hero = () => {
  return (
    <section className="hero">
      {/* Hero text content */}
      <div className="hero-text">
        {/* Main heading */}
        <h1>
          All-Inclusive Living, <br />
          <span className="hero-text2">One Platform.</span>
        </h1>
        {/* Description */}
        <p>
          Discover seamless scheduling with{" "}
          <span className="hero-text2" style={{ fontWeight: "bold" }}>
            Love&Care
          </span>
          , your ultimate caregiver booking platform. Easily update your
          availability in real-time and let clients book sessions directly
          without any scheduling conflicts. Find the perfect caregiver or
          client effortlessly.
        </p>
      </div>

      {/* Hero image */}
      <div className="hero-image">
        <img src={heroImage} alt="Hero Section" />
      </div>
    </section>
  );
};

export default Hero;
