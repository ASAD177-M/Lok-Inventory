import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // Check login status via token
  const token = localStorage.getItem("token");

  // Instant Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Immediately redirect to login page
    navigate("/login");
  };

  return (
    <header>
      <div className="header-main">
        {/* Left side */}
        <div className="header-left">
          <Link to="/" className="logo">
            Lok Inventory
          </Link>

          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/sell">Sell Product</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="header-right">
          {token ? (
            // Jab User Logged In ho tab Logout Button dikhega
            <button  onClick={handleLogout} className="login-btn">
              Logout
            </button>
          ) : (
            // Jab Logged Out ho tab Login aur Signup dikhega
            <>
              <Link to="/signup" className="signup-btn">
                Sign Up Now
              </Link>

              <Link to="/login" className="login-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;