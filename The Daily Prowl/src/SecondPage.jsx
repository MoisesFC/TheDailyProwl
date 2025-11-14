import './Extra.css';
import Choose from './assets/Page2/choose.png';
import Your from './assets/Page2/your.png';
import Major from './assets/Page2/major.png';
import Arrow from './assets/Page2/arrow.png';
import Next from './assets/Page2/next.png';
import Owl from './assets/Page2/owl.png';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SecondPage() {
  const navigate = useNavigate();

  const [major, setMajor] = useState("");

  return (
    <div className="app-background">
     <img src={Your} alt="your" className="yourtext" />
      <img src={Choose} alt="choose" className="choosetext" />
      <img src={Major} alt="major" className="majortext" />
        <img src={Owl} alt="owl" className="owlgo" />

        <select 
        className="major-dropdown" 
        value={major} 
        onChange={(e) => setMajor(e.target.value)}
      >
        <option value="" disabled hidden>Select your major...</option>
        <option value="cs">Computer Science</option>
        <option value="it">Information Technology</option>
        <option value="biology">Biology</option>
        <option value="business">Game Design</option>
        <option value="business">Business</option>
      </select>

      <button 
        onClick={() => navigate('/sixth')} 
        style={{ 
          position: 'absolute', 
          bottom: '5%', 
          left: '25%', 
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


      <button 
        onClick={() => navigate('/third')} 
        style={{ 
          position: 'absolute', 
          bottom: '5%', 
          right: '5%', 
          padding: '10px 20px',
          fontFamily: "'Burbank Big Condensed', sans-serif",
          fontSize: '1.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Go to page 3!
      </button>
    </div>
  );
}

export default SecondPage;