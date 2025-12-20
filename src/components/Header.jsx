import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const navLinks = [
    { label: 'Home', target: '/', isLink: true },
    { label: 'Work', target: 'menu', isLink: false },
    { label: 'Projects', target: '/projects', isLink: true },
    { label: 'Career', target: 'contact', isLink: false },
    { label: 'Contact', target: 'contact', isLink: false }
  ]

  const scrollToSection = (e, target) => {
    e.preventDefault()
    if (target === 'menu') {
      // For menu section, we need to find the menu section element
      const menuSection = document.querySelector('.menu-section')
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      const element = document.getElementById(target)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-text">
            Elev<span className="logo-ai">AI</span>te Labs
          </Link>
        </div>
        <nav className="nav">
          {navLinks.map((link) =>
            link.isLink ? (
              <Link
                key={link.target}
                to={link.target}
                className="nav-link"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.target}
                href={`#${link.target}`}
                className="nav-link"
                onClick={(e) => scrollToSection(e, link.target)}
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

