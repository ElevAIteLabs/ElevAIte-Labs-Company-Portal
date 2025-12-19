import React, { useEffect } from 'react';

function Hero() {
  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.22/build/spline-viewer.js';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="hero" className="main">
      <div className="hero-container" style={{ alignItems: 'flex-start', paddingTop: '80px' }}>
        <div className="hero-content-wrapper" style={{ marginTop: 0 }}>
          <h1 className="hero-title">
            <span className="title-elevaite">
              Elev<span className="title-ai">AI</span>te
            </span>
            <br />
            <span className="title-labs">Labs</span>
            <p className="hero-tagline">
              Crafting exceptional Digital Experiences through innovative design and cutting-edge technology
            </p>
          </h1>
          <div className="hero-cta">
            <button className="cta-button" onClick={handleExploreClick}>
              Explore <span className="arrow">→</span>
            </button>
          </div>
        </div>
        <div className="hero-animation">
          <spline-viewer 
            url="https://prod.spline.design/gPH4ewWSyOhtYyrz/scene.splinecode"
            loading="eager"
            class="spline-viewer"
            style={{
              '--cursor': 'pointer',
              '--border-radius': '0',
              '--background-color': 'transparent',
              '--controls-color': 'transparent',
              '--ui-overlay': 'none',
            }}
            loading-anim
            loading-anim-type="spinner-big-dark"
            shadow-intensity="0"
            background="transparent"
            events-target="global"
          ></spline-viewer>
        </div>
      </div>
    </main>
  );
}

export default Hero;

