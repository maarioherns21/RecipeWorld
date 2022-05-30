import React from "react";
import "../../pages/App/App.css";
import { Button } from "../Button/Button";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/video/video.mp4" autoPlay loop muted />
      <h1>Recipe World</h1>
      <p>What are you waiting for?</p>
      <Button
        className="btns hero-btns"
        buttonStyle="btn--outline"
        buttonSize="btn--large"
      >
        GET STARTED
      </Button>
    </div>
  );
}
