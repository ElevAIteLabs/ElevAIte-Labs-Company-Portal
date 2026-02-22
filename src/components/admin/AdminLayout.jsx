import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiHome, FiGrid, FiLogOut, FiChevronRight, FiBriefcase, FiPlus } from 'react-icons/fi';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin/login');
  };

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: <FiHome size={20} />,
      path: '/admin/dashboard',
      submenu: []
    },
    {
      title: 'Projects',
      icon: <FiGrid size={20} />,
      path: '/admin/projects',
      submenu: [
        { title: 'All Projects', path: '/admin/projects' },
        { title: 'Add New', path: '/admin/projects/new' },
      ]
    },
    {
      title: 'Careers',
      icon: <FiBriefcase size={20} />,
      path: '/admin/roles',
      submenu: [
        { title: 'All Roles', path: '/admin/roles' },
        { title: 'Add New', path: '/admin/roles/new' },
      ]
    }
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Menu Toggle */}
      <button
        className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin/dashboard" className="logo">
            <span className="logo-text">Elev<span>AI</span>te</span>
            <span className="logo-subtext">Admin Panel</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className={item.submenu?.length > 0 ? 'has-submenu' : ''}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                  onClick={(e) => {
                    if (item.submenu?.length > 0) {
                      e.preventDefault();
                      toggleSubmenu(item.title);
                    }
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.title}</span>
                  {item.submenu?.length > 0 && (
                    <span className={`submenu-toggle ${activeSubmenu === item.title ? 'open' : ''}`}>
                      <FiChevronRight size={16} />
                    </span>
                  )}
                </Link>

                {item.submenu?.length > 0 && (
                  <ul className={`submenu ${activeSubmenu === item.title ? 'open' : ''}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className={`submenu-link ${location.pathname === subItem.path ? 'active' : ''}`}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="admin-content">
        <header className={`admin-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-content">
            <div className="header-left">
              <h1 className="page-title">
                {navItems.find(item =>
                  location.pathname === item.path ||
                  (item.submenu && item.submenu.some(sub => sub.path === location.pathname))
                )?.title || 'Dashboard'}
              </h1>
            </div>
            <div className="header-right">
              <div className="user-menu">
                <div className="user-avatar">
                  <span>AD</span>
                </div>
                <div className="user-info">
                  <span className="user-name">Admin User</span>
                  <span className="user-role">Administrator</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
