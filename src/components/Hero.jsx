import React, { useEffect } from 'react';

function Hero() {
  useEffect(() => {
    // Load the latest Spline viewer script
    const existingScript = document.querySelector('script[src*="spline-viewer"]');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.27/build/spline-viewer.js';
      script.type = 'module';
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []); // Added missing closing bracket and dependency array

  const handleExploreClick = (e) => {
    e.preventDefault();
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="hero" className="main" style={{ position: 'relative', zIndex: 1 }}>
      <div className="hero-container" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        paddingTop: '80px',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        gap: '2rem'
      }}>
        <div className="hero-content-wrapper" style={{
          flex: '1',
          position: 'relative',
          zIndex: 10,
          padding: '2rem',
          maxWidth: '50%',
          textAlign: 'left'
        }}>
          <h1 className="hero-title">
            <span className="title-elevaite">
              Elev<span className="title-ai">AI</span>te
            </span>
            <br />
            <span className="title-labs">Labs</span>
          </h1>
          <p className="hero-description" style={{
            color: '#ffffffff',
            fontSize: '1.1rem',
            margin: '1.5rem 0',
            maxWidth: '500px',
            lineHeight: '1.6'
          }}>

            We build AI-powered web apps, mobile apps, and automation solutions for startups and businesses
          </p>
          <div className="hero-cta">
            <button className="cta-button" onClick={handleExploreClick}>
              Explore <span className="arrow">→</span>
            </button>
          </div>
        </div>
        <div className="hero-animation" style={{
          flex: '1',
          position: 'relative',
          height: '70vh',
          width: '45%',
          overflow: 'hidden',
          zIndex: 1,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginTop: '40px',
          transform: 'translateY(80px)'
        }}>
          <spline-viewer
            url="https://prod.spline.design/gPH4ewWSyOhtYyrz/scene.splinecode"
            loading="eager"
            loading-anim
            class="spline-viewer"
            style={{
              '--cursor': 'pointer',
              '--border-radius': '0',
              '--background-color': 'transparent',
              '--controls-color': 'transparent',
              '--ui-overlay': 'none',
              position: 'absolute',
              width: '150%',
              height: '150%',
              left: '-25%',
              top: '-20%',
              border: 'none',
              outline: 'none',
              pointerEvents: 'none',
              transform: 'scale(0.7)'
            }}
            loading-anim-type="spinner-big-dark"
            shadow-intensity="0"
            background="transparent"
            events-target="global"
          ></spline-viewer>
        </div>
      </div>
      <style jsx global>{`
        .spline-viewer::part(logo),
        .spline-viewer::part(watermark),
        .spline-watermark {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
        .spline-viewer::part(loading) {
          background: transparent !important;
        }
        @media (min-width: 769px) and (max-width: 1280px) {
          .hero-animation {
            margin-top: 80px !important;
            transform: translateY(60px) !important;
            position: relative;
            overflow: hidden;
          }
          .spline-viewer {
            position: relative;
            top: 20px;
          }
          .spline-viewer::part(watermark),
          .spline-watermark,
          .spline-viewer::part(watermark-container),
          .spline-viewer::part(watermark-link),
          .spline-watermark-container,
          .spline-watermark-link,
          [class*='watermark'],
          [class*='Watermark'] {
            position: absolute !important;
            bottom: -100px !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            clip: rect(0, 0, 0, 0) !important;
            overflow: hidden !important;
          }
        }
        @media (max-width: 768px) {
          .hero-container {
            padding: 15px 10px !important;
            min-height: 80vh !important;
            max-height: 1000vh !important;
            gap: 1.5rem !important;
            flex-direction: column !important;
            height: auto !important;
          }
          .hero-content-wrapper {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            order: 1 !important;
            text-align: center !important;
          }
          .hero-description {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-animation {
            display: none !important;
          }
          /* Enhanced watermark and logo hiding */
          .spline-viewer::part(logo),
          .spline-viewer::part(watermark),
          .spline-watermark,
          .spline-viewer::part(watermark-container),
          .spline-viewer::part(watermark-link),
          .spline-watermark-container,
          .spline-watermark-link,
          [class*='watermark'],
          [class*='Watermark'],
          [class*='spline-watermark'],
          [class*='spline-logo'],
          [class*='SplineWatermark'],
          [class*='SplineLogo'],
          a[href*='spline'],
          a[href*='Spline'] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -9999px !important;
            top: -9999px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            margin: -1px !important;
            padding: 0 !important;
            border: 0 !important;
            font-size: 0 !important;
            line-height: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}

export default Hero;

