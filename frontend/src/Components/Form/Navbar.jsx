import { useState } from 'react';
import L from '../../CSS/Form/Navbar.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const Navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
      localStorage.removeItem('user')
      Navigate('/')
  };

  const navLinks = [
    { name: 'Profile', path: '/profile' },
    { name: 'Experience', path: '/experience' },
    { name: 'Project', path: '/project' },
    { name: 'Certificate', path: '/certificate' },
    { name: 'Education', path: '/education' }
  ];

  return (
    <nav className={L.navbar}>
      <div className={L.navbarContainer}>
        {/* Logo */}
        <a href="/" className={L.navbarLogo}>
          <span>MyPortfolio</span>
        </a>

        {/* Desktop Navigation */}
        <div className={L.navbarMenu}>
          <ul className={L.navbarNav}>
            {navLinks.map((link, index) => (
              <li key={index} className={L.navbarItem}>
                <a href={link.path} className={L.navbarLink}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button className={L.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className={L.navbarToggle} onClick={toggleMenu}>
          <span className={`${L.hamburger} ${isMenuOpen ? L.active : ''}`}></span>
          <span className={`${L.hamburger} ${isMenuOpen ? L.active : ''}`}></span>
          <span className={`${L.hamburger} ${isMenuOpen ? L.active : ''}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${L.navbarMobile} ${isMenuOpen ? L.active : ''}`}>
        <ul className={L.navbarMobileNav}>
          {navLinks.map((link, index) => (
            <li key={index} className={L.navbarMobileItem}>
              <a 
                href={link.path} 
                className={L.navbarMobileLink}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className={L.navbarMobileItem}>
            <button 
              className={`${L.logoutBtn} ${L.mobile}`} 
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;