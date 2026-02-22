import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-layout">
      {!isHomePage && (
        <Link to="/" className="global-back-home">
          <FiHome /> <span>Back to Home</span>
        </Link>
      )}
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
