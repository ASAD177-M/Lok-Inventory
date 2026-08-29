import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">

          <div className="hero-text">
            <span className="hero-tag">SMART INVENTORY MANAGEMENT</span>

            <h1>
              Manage Your Inventory
              <span> Smarter & Faster</span>
            </h1>

            <p>
              Keep track of your products, manage stock, and grow your
              business with a simple and powerful inventory management system.
            </p>

            <div className="hero-buttons">
              <Link to="/signup" className="hero-primary">
                Get Started
              </Link>

              <Link to="/products" className="hero-secondary">
                View Products
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="hero-dashboard">
            <div className="dashboard-top">
              <div>
                <p>Total Products</p>
                <h2>1,248</h2>
              </div>

              <span className="dashboard-icon">📦</span>
            </div>

            <div className="dashboard-stats">

              <div className="stat-card">
                <span>Stock Value</span>
                <strong>₹84,560</strong>
                <small>+12.5%</small>
              </div>

              <div className="stat-card">
                <span>Low Stock</span>
                <strong>24</strong>
                <small>Products</small>
              </div>

            </div>

            <div className="stock-chart">
              <div className="chart-header">
                <span>Inventory Overview</span>
                <span>Last 7 days</span>
              </div>

              <div className="chart">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
                <div className="bar bar-5"></div>
                <div className="bar bar-6"></div>
                <div className="bar bar-7"></div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Features Section */}
      <section className="features-section">

        <div className="section-heading">
          <span>FEATURES</span>

          <h2>
            Everything you need to manage your inventory
          </h2>

          <p>
            Simple tools that help you keep your stock organized and
            your business running smoothly.
          </p>
        </div>


        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">📦</div>

            <h3>Product Management</h3>

            <p>
              Easily add, update, remove and organize all your products
              in one place.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>Track Inventory</h3>

            <p>
              Monitor your stock levels and quickly identify products
              that need attention.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">⚡</div>

            <h3>Fast & Simple</h3>

            <p>
              A clean and easy-to-use interface designed to save you
              time and effort.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">🔒</div>

            <h3>Secure Data</h3>

            <p>
              Keep your inventory information secure with reliable
              authentication and data management.
            </p>
          </div>

        </div>

      </section>


      {/* CTA Section */}
      <section className="home-cta">

        <div>
          <h2>Ready to simplify your inventory?</h2>

          <p>
            Start managing your products smarter today.
          </p>
        </div>

        <Link to="/signup" className="cta-button">
          Create Account
        </Link>

      </section>

    </main>
  );
}

export default Home;