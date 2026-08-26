import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import byru from '../assets/images/byru.jpg';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={byru} alt="Byru Vishwajitha" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/VISHWAJITHA28" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/vishwajithabyru28/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:byruvishwajitha@gmail.com"><EmailIcon/></a>
          </div>
          <h1>Byru Vishwajitha</h1>
          <p>AI Engineer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/VISHWAJITHA28" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/vishwajithabyru28/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:byruvishwajitha@gmail.com"><EmailIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
