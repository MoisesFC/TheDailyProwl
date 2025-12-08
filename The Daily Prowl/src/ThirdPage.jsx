import './App.css';
import { useNavigate } from 'react-router-dom';
import mainMenuImage from './assets/Page3/DP6_0002_Main-Menu.png';
import mainMenuIcon from './assets/Page3/DP6_0001_Layer-3.png';
import owlBackground from './assets/Page3/DP6_0011_Layer-2.png';
import accountIcon from './assets/Page3/DP6_0010_Account.png';
import pageTitle from './assets/Page3/dailyprs.png';
import upcommingEventsButton from './assets/Page3/DP6_0003_Upcoming-Events.png';
import yourScheduleButton from './assets/Page3/DP6_0004_Your-Schedule.png';
import ksuClubsButton from './assets/Page3/DP6_0005_KSU-Clubs.png';
import latestNewsButton from './assets/Page3/DP6_0007_Latest-News.png';
import bucketListButton from './assets/Page3/bucketList.png';

function ThirdPage() {
  const navigate = useNavigate();

  return (
    <div
      className="app-background"
      style={{
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      {/* Owl overlay placed above existing CSS background but beneath the menu images */}
      <img
        src={owlBackground}
        alt="Owl Background Overlay"
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          width: '60%',
          height: 'auto',
          objectFit: 'contain',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <img 
        src={mainMenuImage} 
        alt="Main Menu"
        onClick={() => navigate('/second')}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '15px',
          maxWidth: '60%',
          height: 'auto',
          zIndex: 2,
          cursor: 'pointer'
        }}
      />
      <img
        src={mainMenuIcon}
        alt="Main Menu Icon"
        onClick={() => navigate('/second')}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '15px',
          maxWidth: '18%',
          height: 'auto',
          zIndex: 2,
          cursor: 'pointer'
        }}
      />
      {/* Navigation buttons stacked vertically on the left */}
      <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <img
          src={upcommingEventsButton}
          onClick={() => navigate('/events')}
          alt="Upcoming Events"
          style={{
            width: '250px',
            height: 'auto',
            cursor: 'pointer',
            objectFit: 'contain'
          }}
        />
        <img
          src={yourScheduleButton}
           onClick={() => navigate('/sixth')}
          alt="Your Schedule"
          style={{
            width: '250px',
            height: 'auto',
            cursor: 'pointer',
            objectFit: 'contain'
          }}
        />
        <img
          src={ksuClubsButton}
          onClick={() => navigate('/seventh')}
          alt="KSU Clubs"
          style={{
            width: '250px',
            height: 'auto',
            cursor: 'pointer',
            objectFit: 'contain'
          }}
        />
        <img
          src={latestNewsButton}
          alt="Latest News"
          style={{
            width: '250px',
            height: 'auto',
            cursor: 'pointer',
            objectFit: 'contain'
          }}
        />
        <img
          src={bucketListButton}
          onClick={() => window.open('https://owllife.kennesaw.edu/involvement/paths#/', '_blank')}
          alt="Scrappy's Bucket Lists"
          style={{
            width: '250px',
            height: 'auto',
            cursor: 'pointer',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Page title placed to the left of the account icon */}
      <img
        src={pageTitle}
        alt="Page Title"
        style={{
          position: 'absolute',
          top: '18px',
          right: '134px',
          width: '270px',
          height: 'auto',
          objectFit: 'contain',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />

      {/* Account icon in the top-right corner */}
      <img
        src={accountIcon}
        onClick={() => navigate('/fifth')}
        alt="Account"
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          zIndex: 3,
          cursor: 'pointer'
        }}
      />
    </div>
    
  );
}

export default ThirdPage;