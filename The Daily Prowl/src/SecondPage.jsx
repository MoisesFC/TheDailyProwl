import './App.css';
import { useNavigate } from 'react-router-dom';

function SecondPage() {
  const navigate = useNavigate();

  return (
    <div className="app-background">
      {/* Example content */}
      <h1 
        style={{ 
          position: 'absolute', 
          top: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          fontFamily: "'Burbank Big Condensed', sans-serif",
          fontSize: '2rem',
          color: 'black'
        }}
      >
        Welcome to Page 2
      </h1>

      {/* Optional back button */}
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          position: 'absolute', 
          bottom: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontFamily: "'Burbank Big Condensed', sans-serif",
          fontSize: '1.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Back to Login
      </button>
    </div>
  );
}

export default SecondPage;