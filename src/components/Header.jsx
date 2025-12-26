import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const navLinks = [
    { id: 1, label: "Home", target: "/", isLink: true },
    { id: 2, label: "Work", target: "menu", isLink: false },
    { id: 3, label: "Projects", target: "/projects", isLink: true },
    { id: 4, label: "Career", target: "career", isLink: false },
    { id: 5, label: "Contact", target: "/contacts", isLink: true },
  ];

  const scrollToSection = (e, target) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Handle navigation to sections on the home page
    if (target === "career" || target === "menu") {
      // If we're not on the home page, navigate to home page with hash
      if (window.location.pathname !== "/") {
        window.location.href = `/#services`; // Always navigate to services section for 'menu' target
        return;
      }
    }

    const el =
      target === "menu"
        ? document.querySelector("#services") || document.querySelector(".menu-section")
        : document.getElementById(target);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Close menu on route change */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /* Close menu on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="container">
          {/* HAMBURGER */}
          <button
            ref={hamburgerRef}
            className={`hamburger ${isMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="logo"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="logo-text">
              Elev<span className="logo-ai">AI</span>te Labs
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav>
            <ul
              ref={navRef}
              className={`nav ${isMenuOpen ? "nav--open" : ""}`}
              id="main-navigation"
            >
              {navLinks.map((link) => (
                <li key={link.id}>
                  {link.isLink ? (
                    <Link
                      to={link.target}
                      className="nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.target}`}
                      className="nav-link"
                      onClick={(e) => scrollToSection(e, link.target)}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
