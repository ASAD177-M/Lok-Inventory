import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span>ABOUT LOK INVENTORY</span>

          <h1>
            Simple inventory
            <br />
            management for everyone.
          </h1>

          <p>
            Lok Inventory helps businesses manage products, track stock,
            and keep their inventory organized from one simple platform.
          </p>
        </div>
      </section>


      {/* About Content */}
      <section className="about-content">

        <div className="about-image">
          <div className="about-image-card">
            <div className="about-card-header">
              <span>Inventory Overview</span>
              <span>•••</span>
            </div>

            <div className="about-number">
              <span>Total Products</span>
              <strong>1,248</strong>
            </div>

            <div className="about-bars">
              <div className="about-bar about-bar-1"></div>
              <div className="about-bar about-bar-2"></div>
              <div className="about-bar about-bar-3"></div>
              <div className="about-bar about-bar-4"></div>
              <div className="about-bar about-bar-5"></div>
            </div>
          </div>
        </div>


        <div className="about-text">

          <span>WHO WE ARE</span>

          <h2>
            Making inventory management simple.
          </h2>

          <p>
            Managing inventory can become complicated when products,
            stock levels and business information are spread across
            different places.
          </p>

          <p>
            Lok Inventory is designed to bring everything together in
            one easy-to-use platform. Our goal is to make inventory
            management simple, organized and efficient.
          </p>

          <Link to="/signup" className="about-button">
            Get Started
          </Link>

        </div>

      </section>


      {/* Mission */}
      <section className="mission-section">

        <div className="mission-heading">
          <span>OUR MISSION</span>

          <h2>
            Helping businesses stay organized.
          </h2>

          <p>
            We focus on creating simple tools that make everyday
            inventory tasks faster and easier.
          </p>
        </div>


        <div className="mission-grid">

          <div className="mission-card">
            <div className="mission-icon">📦</div>

            <h3>Organize</h3>

            <p>
              Keep all your products and inventory information
              organized in one place.
            </p>
          </div>


          <div className="mission-card">
            <div className="mission-icon">📊</div>

            <h3>Track</h3>

            <p>
              Easily monitor your stock and understand what is
              happening with your inventory.
            </p>
          </div>


          <div className="mission-card">
            <div className="mission-icon">⚡</div>

            <h3>Grow</h3>

            <p>
              Save time on inventory tasks and focus more on
              growing your business.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="about-cta">

        <div>
          <h2>Ready to manage your inventory?</h2>

          <p>
            Create your account and get started today.
          </p>
        </div>

        <Link to="/signup">
          Create Account
        </Link>

      </section>

    </main>
  );
}

export default About;