import "./Header.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check login status via token
  const token = localStorage.getItem("token");

  // Instant Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);

    // Immediately redirect to login page
    navigate("/login");
  };

  // Helper function to close menu on link click
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <div className="header-main">
        {/* Left side */}
        <div className="header-left">
          <Link to="/" className="logo" onClick={closeMenu}>
            Lok Inventory
          </Link>

          <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/products" onClick={closeMenu}>Products</Link>
            <Link to="/sell" onClick={closeMenu}>Sell Product</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="header-right">
          {token ? (
            // Jab User Logged In ho tab Logout Button dikhega
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          ) : (
            // Jab Logged Out ho tab Login aur Signup dikhega
            <>
              <Link to="/signup" className="signup-btn" onClick={closeMenu}>
                Sign Up Now
              </Link>

              <Link to="/login" className="login-btn" onClick={closeMenu}>
                Login
              </Link>
            </>
          )}

          {/* Hamburger Icon Button (Mobile Only) */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;