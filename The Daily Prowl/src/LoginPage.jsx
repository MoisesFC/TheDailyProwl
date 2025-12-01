import './App.css';
import Sun from './assets/Page1/sun.png';
import Owl from './assets/Page1/owl.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();

  // Basic checks
  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  if (!email.endsWith("@students.kennesaw.edu")) {
    setError("Please use your KSU student email.");
    return;
  }

  // Fake password check
  if (password !== "owl123") {
    setError("Incorrect password. Try again.");
    return;
  }

  // If everything is valid → move to next page
  setError("");
  navigate('/second');
};
  

  return (
    <div className="app-background">
      <img src={Sun} alt="Sun" className="sun-icon" />
      <h1 className="app-title">The Daily Prowl</h1>
      <img src={Owl} alt="KSU Owl Logo" className="owl-logo" />

                <form onSubmit={handleSubmit} className="text-box-container first-box">
            <div className="input-wrapper">
              <span className="input-label">Password</span>
              <input
                type="password"
                placeholder="Type your password..."
                className="text-box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="text-box-container second-box">
            <div className="input-wrapper">
              <span className="input-label">Email</span>
              <input
                type="email"
                placeholder="Type your KSU student email..."
                className="text-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
        </div>
  );
}

export default LoginPage;