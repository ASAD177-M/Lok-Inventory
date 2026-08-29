import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api"; // Make sure path points to your api instance

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success || response.status === 201 || response.status === 200) {
        setSuccessMsg(
          "Account created successfully! 🎉 Your account is pending Admin approval. Please wait for admin confirmation before login."
        );
        
        // Form Reset
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // 3 seconds baad login page par redirect
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log("Signup Error:", error);
      setErrorMsg(
        error.response?.data?.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container">
        {/* Left Side */}
        <div className="signup-left">
          <div className="signup-brand">
            <Link to="/">Lok Inventory</Link>
          </div>

          <div className="signup-intro">
            <span>GET STARTED</span>

            <h1>
              Start managing
              <br />
              your inventory.
            </h1>

            <p>
              Create your account and manage your products, stock and inventory
              from one simple platform.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="signup-right">
          <div className="signup-box">
            <div className="signup-heading">
              <h2>Create an account</h2>

              <p>Enter your details to create your account.</p>
            </div>

            {/* Success Message Alert */}
            {successMsg && (
              <div
                style={{
                  color: "#166534",
                  backgroundColor: "#dcfce7",
                  padding: "12px",
                  borderRadius: "6px",
                  marginBottom: "15px",
                  fontSize: "14px",
                  lineHeight: "1.4",
                }}
              >
                {successMsg}
              </div>
            )}

            {/* Error Message Alert */}
            {errorMsg && (
              <div
                style={{
                  color: "#991b1b",
                  backgroundColor: "#fee2e2",
                  padding: "10px",
                  borderRadius: "6px",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="signup-input-group">
                <label htmlFor="name">Full Name</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="signup-input-group">
                <label htmlFor="email">Email Address</label>

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

              {/* Password */}
              <div className="signup-input-group">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="signup-input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Terms */}
              <div className="terms-row">
                <label>
                  <input type="checkbox" required />
                  <span>I agree to the Terms & Conditions</span>
                </label>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <div className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;