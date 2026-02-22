import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = '100%', 
  height = 'auto',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    // Preload the image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [src]);

  // For LCP elements, we want to prioritize loading
  const isLCP = props.priority || false;

  if (isMobile && isLCP) {
    return (
      <img
        src={src}
        alt={alt}
        className={`optimized-image ${className}`}
        style={{
          width,
          height,
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
        }}
        loading="eager"
        fetchpriority="high"
        {...props}
      />
    );
  }

  return (
    <LazyLoadImage
      src={imageSrc || src}
      alt={alt}
      className={`optimized-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      effect="opacity"
      width={width}
      height={height}
      style={{
        width,
        height,
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        transition: 'opacity 0.3s ease',
      }}
      loading={isLCP ? 'eager' : 'lazy'}
      fetchpriority={isLCP ? 'high' : 'auto'}
      {...props}
    />
  );
};

export default OptimizedImage;
