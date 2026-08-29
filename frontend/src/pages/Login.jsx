import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api"; // Make sure path correctly points to your api instance

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success || response.status === 200) {
        // Save Token & User in LocalStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login successful! 🚀");
        navigate("/products");
      }
    } catch (error) {
      console.log("Login Error:", error);
      setErrorMsg(
        error.response?.data?.message || "Invalid credentials! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <div className="login-brand">
            <Link to="/">Lok Inventory</Link>
          </div>

          <div className="login-intro">
            <span>WELCOME BACK</span>

            <h1>
              Manage your inventory
              <br />
              with ease.
            </h1>

            <p>
              Login to your account and keep track of your products, stock and
              inventory.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-box">
            <div className="login-heading">
              <h2>Welcome back</h2>

              <p>Enter your details to access your account.</p>
            </div>

            {/* Error Message Display */}
            {errorMsg && (
              <div
                style={{
                  color: "#ef4444",
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
              {/* Email */}
              <div className="input-group">
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
              <div className="input-group">
                <div className="password-label">
                  <label htmlFor="password">Password</label>

                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Remember */}
              <div className="remember-row">
                <label>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Signup */}
            <div className="signup-text">
              Don't have an account?{" "}
              <Link to="/signup">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;