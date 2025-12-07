import './App.css';
import Sun from './assets/Page1/sun.png';
import Owl from './assets/Page1/owl.png';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from './lib/supabaseClient';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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

    setLoading(true);
    setError('');

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setError("Invalid email or password");
        return;
      }

      // If everything is valid → move to next page
      navigate('/third');
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="app-background">
      <img src={Sun} alt="Sun" className="sun-icon" />
      <h1 className="app-title">The Daily Prowl</h1>
      <img src={Owl} alt="KSU Owl Logo" className="owl-logo" />

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

          <p style={{
            position: 'absolute',
            bottom: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Burbank Big Condensed', sans-serif",
            fontSize: '1rem',
            color: 'white',
            textAlign: 'center',
            width: '100%'
          }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#4da6ff', textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </p>
        </div>
  );
}

export default LoginPage;