import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { supabase } from './lib/supabaseClient';

/* icons */
import accountIcon from './assets/Page3/DP6_0010_Account.png';
import ksuLogo from "./assets/Page5/KSU.png";


/*logo */
import lok from "./assets/Page5/lock.png";
import sched from "./assets/Page5/sched.png";
import bok from "./assets/Page5/book.png";
import gear from "./assets/Page5/gear.png";
import stamp from "./assets/Page5/stamp.png";
import logout from "./assets/Page5/logout.png";


import './App.css';

function Page5() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setMessage('Logged out successfully');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      alert('Error logging out: ' + err.message);
    }
  };
  
  
const styles = {
  phone: {
    width: 390, height: 700, borderRadius: 28, overflow: "hidden", position: "relative",
    background: "linear-gradient(#d9cb64, #ccb957)",
    boxShadow: "0 16px 48px rgba(0,0,0,.6), inset 0 2px 0 rgba(0,0,0,.55)",
    border: "1px solid rgba(0,0,0,.35)"
  },
  header: {
    height: 68, display: "grid", gridTemplateColumns: "1fr 56px", alignItems: "center",
    padding: "8px 14px 8px 16px", borderBottom: "2px solid #202018",
    background: "linear-gradient(#c6d3e7, #bcd0e6)"
  },
  title: {
    fontWeight: 900, fontSize: 26, color: "#f8bd00",
    textShadow: "0 3px 0 #231f20, 0 4px 2px rgba(0,0,0,.4)"
  },
  badge: {
    justifySelf: "end", width: 46, height: 46, borderRadius: 12, background: "#e0c25a",
    border: "2px solid #1f1a0e", display: "grid", placeItems: "center",
    boxShadow: "0 3px 0 rgba(0,0,0,.35)"
  },
  content: { position: "absolute", inset: "68px 0 0 0", padding: "12px 16px 24px 16px", overflowY: "auto" },
  row: {
    display: "grid", gridTemplateColumns: "1fr 54px", alignItems: "center", gap: 10,
    background: "#ebeef4", border: "2px solid #2d2a22", borderRadius: 14, padding: "14px 16px",
    boxShadow: "0 3px 0 rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.55)", marginTop: 65
  },
  label: {
    fontWeight: 900, fontSize: 22, color: "#171513",
    textShadow: "0 2px 0 #fff, 0 3px 0 rgba(0,0,0,.25)"
  },
  icon: {
    width: 48, height: 48, borderRadius: 10, border: "2px solid #ffc400ff",
    background: "#ffc400ff", display: "grid", placeItems: "center",
    boxShadow: "0 3px 0 rgba(0,0,0,.35)"
  },
  ksu: {
    position: "absolute", left: 24, bottom: 92, width: 240, transform: "rotate(-12deg)",
    opacity: .95, filter: "drop-shadow(0 2px 0 rgba(0,0,0,.55))"
  },
  spot: {
    position: "absolute", left: "50%", bottom: 128, transform: "translateX(-50%)",
    width: 320, height: 220, borderRadius: "50%", filter: "blur(28px)",
    background: "radial-gradient(closest-side, rgba(0,0,0,.18), rgba(0,0,0,0))",
    pointerEvents: "none"
  }
};

  const Avatar = () => (
    <div style={styles.badge}>
      <span style={{
        width: 26, height: 26, borderRadius: "50%", display: "inline-block",
        background:
          "radial-gradient(circle at 50% 35%, #000 62%, transparent 63%)," +
          "radial-gradient(circle at 50% 85%, #000 45%, transparent 46%)"
      }}/>
    </div>
  );

  const Row = ({ label, icon, onClick, style }) => (
    <div
      style={{ ...styles.row, ...style }}
      onClick={onClick}
    >
      <div style={styles.label}>{label}</div>
      <div style={styles.icon}>
        <img
          src={icon}
          alt=""
          width="28"
          height="28"
          style={{ filter: "drop-shadow(0 2px 0 rgba(0,0,0,.35))" }}
        />
      </div>
    </div>
  );

  return (
    <div className="app-background">

        <img
                  src={accountIcon}
                  onClick={() => navigate('/third')}
                  alt="Account"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '12px',
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    zIndex: 3,
                    cursor: 'pointer'
                  }}
                />

        <div style={styles.content}>
          {message && (
            <div style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '10px',
              marginBottom: '10px',
              textAlign: 'center',
              fontFamily: "'Burbank Big Condensed', sans-serif",
              fontSize: '1rem'
            }}>
              {message}
            </div>
          )}
          <Row label="Schedule" icon={sched} onClick={() => navigate('/sixth')} style = {{cursor: 'pointer'}}/>
          <Row label="Privacy Statement" icon={lok} onClick={() => navigate('/priv')} style = {{cursor: 'pointer'}}/>

          <Row label="Clubs" icon={stamp} onClick={() => window.location.href = 'https://owllife.kennesaw.edu/organizations'} style = {{cursor: 'pointer'}}/>
          <Row label="Logout" icon={logout} onClick={handleLogout} style = {{cursor: 'pointer'}}/>

          <img src={ksuLogo} alt="KSU" style={styles.ksu} />
          <div style={styles.spot} />
        </div>
      </div>
  );
}
export default Page5;