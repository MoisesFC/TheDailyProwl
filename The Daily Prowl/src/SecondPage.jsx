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
        <option value="bio">Biology</option>
        <option value="business">Game Design</option>
        <option value="business">Business Management</option>
        <option value="law">Law</option>
        <option value="art">Art</option>
        <option value="mus">Music</option>
        <option value="soc">Sociology</option>
        <option value="phy">Physics</option>
        <option value="math">Mathematics</option>
        <option value="sci">Science</option>
        <option value="film">Film</option>
        <option value="comm">Communication</option>
        <option value="lit">Literature</option>
        <option value="writ">Writing</option>
        <option value="econ">Economics</option>
        <option value="pol">Political Science</option>
        <option value="hist">History</option>
        <option value="arc">Architecture</option>
        <option value="graph">Graphic Design</option>
        <option value="eng">Engineering</option>
        <option value="pych">Psychology</option>
        <option value="pharm">Pharmacy</option>
        <option value="nur">Nursing</option>
        <option value="sof">Software Engineering</option>
        <option value="phil">Philosophy</option>
        <option value="ind">Industrial Design</option>
        <option value="edu">Education</option>
        <option value="mark">Marketing</option>
        <option value="acc">Accounting</option>
        <option value="civ">Civil Engineering</option>
        <option value="ele">Electrical Engineering</option>
        <option value="chem">Chemistry</option>
        <option value="data">Data Scientist</option>
        <option value="aero">Aeronomics</option>
        <option value="agr">Agriculture</option>
        <option value="den">Dentistry</option>
        <option value="mech">Mechanical Engineering</option>
        <option value="geo">Geograpy</option>
        <option value="anthr">Anthropology</option>
        <option value="cyb">Cybersecurity</option>
        <option value="env">Environmental Science</option>
        <option value="jour">Journalism</option>
        <option value="pub">Public Health</option>
        <option value="sport">Sports Management</option>
        <option value="anim">Animation</option>
        <option value="biochem">Biochemistry</option>
        <option value="dance">Dance</option>
        <option value="drama">Fine Arts</option>

      </select>

      <img src={Arrow} alt="arr" className="arrow" />

      <button 
        onClick={() => navigate('/')} 
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
          right: '15%', 
          padding: '10px 20px',
          fontFamily: "'Burbank Big Condensed', sans-serif",
          fontSize: '1.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Next!
      </button>
    </div>
  );
}

export default SecondPage;