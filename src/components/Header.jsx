import React from 'react'

function Header() {
  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Work', target: 'menu' },
    { label: 'Career', target: 'contact' },
    { label: 'Contact', target: 'contact' },
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
          <span className="logo-text">
            Elev<span className="logo-ai">AI</span>te Labs
          </span>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className={`nav-link`}
              onClick={(e) => scrollToSection(e, link.target)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

