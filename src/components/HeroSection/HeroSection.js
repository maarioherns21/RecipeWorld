import React from "react";
import "../../pages/App/App.css";
import { Button } from "../Button/Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/video/video.mp4" autoPlay loop muted />
      <h1>Recipe World</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
