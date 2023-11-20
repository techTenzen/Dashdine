import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { IconButton } from "@material-ui/core";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? "visible" : ""}`}>
      {isVisible && (
        <IconButton
          onClick={scrollToTop}
          className="scroll-to-top-button"
          style={{ color: "#007bff" }} 
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </div>
  );
}
