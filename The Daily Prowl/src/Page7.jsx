import React from "react";
import "./App.css";
import { useNavigate } from 'react-router-dom';

function Page7() {
  const navigate = useNavigate();

  const openOwlLife = () => { window.open("https://owllife.kennesaw.edu/organizations", "_blank", "noopener,noreferrer");};
  const openRegistration = () => {window.open("https://owllife.kennesaw.edu/register", "_blank", "noopener,noreferrer")}
  const openYourOrgs = () => {window.open("https://owllife.kennesaw.edu/involvement/currentmemberships", "_blank", "noopener,noreferrer")}


  return (
     <div className="app-background">
    <div className="clubs-page">
      <div className="clubs-frame">
        <div className="top-bar">
          <div className="brand-box">KSU / The Daily Prowl</div>
          <div className="top-right">
            <div className="bell-box" />
            <div className="account-box">
              <div className="account-circle" />
              <span className="account-text">Account</span>
            </div>
          </div>
        </div>

        <h1 className="clubs-title">Clubs</h1>
        <div className="clubs-line" />

        <div className="owl-shell" onClick={openOwlLife}>
          <div className="owl-header">
            <div className="owl-menu" />
            <div className="owl-logo-box">
              <span className="owl-logo-text">OWL LIFE</span>
            </div>
            <div className="owl-header-right">
              <div className="owl-small-circle" />
              <div className="owl-small-circle" />
              <div className="owl-profile-circle">
                <span>R</span>
              </div>
            </div>
          </div>

          <div className="owl-content">
            <h2 className="owl-org-title">Organizations</h2>

            <div className="owl-search-row">
              <div className="owl-search-icon" />
              <span className="owl-search-placeholder">
                Search Organizations
              </span>
            </div>

            <button className="owl-filters-button">FILTERS</button>
            <button className="owl-register-button" onClick={openRegistration}>
              Register an Organization
            </button>

            <div className="owl-card">
              <div className="owl-avatar-circle" />
              <div className="owl-card-text">
                <span className="owl-card-title">#BlackTeachersMatter</span>
              </div>
            </div>

            <div className="owl-card">
              <div className="owl-avatar-circle grey" />
              <div className="owl-card-text">
                <span className="owl-card-title">Academic Advising</span>
              </div>
            </div>
          </div>
        </div>

           <div className="bottom-row">
            <button className="your-clubs-button" onClick={openYourOrgs}>
              Your Clubs
            </button>

            <button className="back-button" onClick={() => navigate('/third')}>
              Back
            </button>

            <div className="home-icon" />
          </div>
         </div>
      </div>
    </div>
  );
}

export default Page7;
