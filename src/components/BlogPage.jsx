import React from 'react';
import { Link } from 'react-router-dom';

function BlogPage() {
  return (
    <div className="blog-page" style={{
      minHeight: '100vh',
      color: 'white',
      padding: '2rem',
      paddingTop: '100px',
      background: 'radial-gradient(ellipse 150% 150% at 130% 50%, #1E88E5 -10%, #0d1b36 40%, #000000 80%)',
      backgroundAttachment: 'fixed',
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: 'transparent',
        pointerEvents: 'none'
      }} />
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          fontWeight: '500'
        }}>Blog</h1>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: 'var(--accent-blue)'
          }}>Coming Soon</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            maxWidth: '800px'
          }}>
            Our blog is under development. Check back soon for insightful articles on AI, technology trends, and industry innovations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
