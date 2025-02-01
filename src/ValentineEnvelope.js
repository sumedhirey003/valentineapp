import React, { useState, useEffect } from "react";
import "./ValentineEnvelope.css";

// Import GIFs
import bubuRoseGif from "./assets/valentine.gif"; //valentine
import huggingBubuGif from "./assets/hug.gif"; //hug
import monkeyYayGif from "./assets/monkey.gif"; //monkey

function ValentineEnvelope() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [showThirdCard, setShowThirdCard] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesCount, setYesCount] = useState(1);
  const [fireworks, setFireworks] = useState([]);
  const [showMonkeyGif, setShowMonkeyGif] = useState(false);

  useEffect(() => {
    let monkeyTimeout;
    let fireworksTimeout;

    if (showThirdCard) {
      setShowMonkeyGif(true);
      monkeyTimeout = setTimeout(() => {
        setShowMonkeyGif(false);
      }, 3000);

      fireworksTimeout = setTimeout(() => {
        setFireworks([]);
      }, 4000);
    }

    return () => {
      if (monkeyTimeout) clearTimeout(monkeyTimeout);
      if (fireworksTimeout) clearTimeout(fireworksTimeout);
    };
  }, [showThirdCard]);

  const moveNoButton = (e) => {
    const container = e.target.closest(".card");
    const containerRect = container.getBoundingClientRect();

    const maxX = containerRect.width - e.target.offsetWidth;
    const maxY = containerRect.height - e.target.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const createFireworks = () => {
    const newFireworks = Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: ["#FF69B4", "#FF1493", "#FFB6C1", "#FFC0CB"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFireworks(newFireworks);
  };

  const handleYesClick = () => {
    createFireworks();
    setYesCount((prev) => Math.min(prev + 1, 10));
    setShowSecondCard(false);

    setShowMonkeyGif(true);
    setTimeout(() => {
      setShowMonkeyGif(false);
      setShowThirdCard(true);
    }, 3000);
  };

  return (
    <div className="valentine-container">
      <div
        className={`envelope ${isEnvelopeOpen ? "open" : ""}`}
        onClick={() => {
          setIsEnvelopeOpen(true);
          setTimeout(() => setShowSecondCard(true), 1000);
        }}
      >
        <div className="envelope-front">
          <h2>For You</h2>
          <span className="heart">❤️</span>
        </div>
        <div className="envelope-back"></div>
        <div className="envelope-flap"></div>
      </div>

      {showSecondCard && (
        <div className={`card second-card ${showThirdCard ? "hidden" : ""}`}>
          <h2>Will you be my Valentine?</h2>
          <img
            src={bubuRoseGif}
            alt="Bubu Rose"
            className="card-gif celebration-gif"
          />
          <div className="button-wrapper">
            {Array.from({ length: yesCount }).map((_, i) => (
              <button key={i} className="btn yes-btn" onClick={handleYesClick}>
                Yes! ❤️
              </button>
            ))}
            <button
              className="btn no-btn"
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              }}
              onMouseEnter={moveNoButton}
            >
              No
            </button>
          </div>
        </div>
      )}

      {showMonkeyGif && (
        <div className="monkey-gif-overlay">
          <img src={monkeyYayGif} alt="Monkey Yay" className="monkey-gif" />
        </div>
      )}

      {showThirdCard && (
        <div className="card third-card">
          <h2>Yay! It's a Date!!</h2>
          <img src={huggingBubuGif} alt="Hugging Bubu" className="card-gif" />
          <p>Thank you for making my heart complete!</p>
        </div>
      )}

      {fireworks.length > 0 && (
        <div className="fireworks">
          {fireworks.map((firework, index) => (
            <div
              key={index}
              className="firework-particle"
              style={{
                left: `${firework.left}%`,
                top: `${firework.top}%`,
                backgroundColor: firework.color,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ValentineEnvelope;
