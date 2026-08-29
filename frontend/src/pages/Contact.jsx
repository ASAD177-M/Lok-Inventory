import "./Contact.css";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    // Yahan contact API connect kar sakte ho
  };

  return (
    <main className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span>GET IN TOUCH</span>

          <h1>
            We'd love to
            <br />
            hear from you.
          </h1>

          <p>
            Have a question, feedback or need help?
            Send us a message and we'll get back to you.
          </p>
        </div>
      </section>


      {/* Contact Section */}
      <section className="contact-section">

        {/* Left Side */}
        <div className="contact-info">

          <span className="contact-label">
            CONTACT US
          </span>

          <h2>
            Let's talk about your inventory.
          </h2>

          <p>
            Whether you have a question about our features,
            need help with your account, or just want to share
            some feedback, we're here to help.
          </p>


          <div className="contact-details">

            <div className="contact-detail">
              <div className="contact-icon">
                ✉
              </div>

              <div>
                <h3>Email</h3>
                <p>support@lokinventory.com</p>
              </div>
            </div>


            <div className="contact-detail">
              <div className="contact-icon">
                ☎
              </div>

              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>


            <div className="contact-detail">
              <div className="contact-icon">
                📍
              </div>

              <div>
                <h3>Address</h3>
                <p>Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>

          </div>

        </div>


        {/* Right Side - Form */}
        <div className="contact-form-box">

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="contact-input">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>


            {/* Email */}
            <div className="contact-input">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>


            {/* Subject */}
            <div className="contact-input">
              <label htmlFor="subject">
                Subject
              </label>

              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>


            {/* Message */}
            <div className="contact-input">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>


            {/* Submit */}
            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>


      {/* FAQ / Bottom Section */}
      <section className="contact-bottom">

        <h2>Need help?</h2>

        <p>
          Check back soon for helpful resources and frequently
          asked questions about Lok Inventory.
        </p>

      </section>

    </main>
  );
}

export default Contact;