import './App.css';
import Sun from './assets/Page1/sun.png';
import Owl from './assets/Page1/owl.png';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/second');
  }

  return (
    <div className="app-background">
      <img src={Sun} alt="Sun" className="sun-icon" />
      <h1 className="app-title">The Daily Prowl</h1>
      <img src={Owl} alt="KSU Owl Logo" className="owl-logo" />

      <form onSubmit={handleSubmit} className="text-box-container first-box">
        <div className="input-wrapper">
          <span className="input-label">Log in</span>
          <input type="text" placeholder="Type your password..." className="text-box" />
        </div>
      </form>

      <form onSubmit={handleSubmit} className="text-box-container second-box">
        <div className="input-wrapper">
          <span className="input-label">Sign in</span>
          <input type="text" placeholder="Type your KSU student email..." className="text-box" />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;