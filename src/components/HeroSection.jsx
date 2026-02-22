import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleOptionClick = (option) => {
    console.log('Selected option:', option);
    // You can add navigation or other actions here
    setIsOptionsOpen(false);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Elev<span style={{ color: '#1E88E5' }}>AI</span>te Labs
          </h1>
          <p>Transforming ideas into intelligent solutions through cutting-edge AI technology and innovative thinking.</p>
          <div className="hero-actions">
            <div className="explore-dropdown">
              <button
                className="explore-btn"
                onClick={toggleOptions}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1E88E5',
                  backgroundColor: '#E3F2FD',
                  border: '2px solid #1E88E5',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Explore
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOptionsOpen && (
                <div
                  className="dropdown-options"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '0.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    minWidth: '200px',
                    zIndex: '1000',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.2s ease-out'
                  }}
                >
                  <button
                    onClick={() => handleOptionClick('AI Solutions')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: '#333',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    AI Solutions
                  </button>
                  <button
                    onClick={() => handleOptionClick('Our Work')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: '#333',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Our Work
                  </button>
                  <button
                    onClick={() => handleOptionClick('About Us')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: '#333',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => handleOptionClick('Contact')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: '#333',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Contact
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hero-image">
          <Spline
            scene="https://prod.spline.design/your-scene-id/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;