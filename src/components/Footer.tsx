import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/VISHWAJITHA28" target="_blank" rel="noreferrer"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/vishwajithabyru28/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
        <a href="mailto:byruvishwajitha@gmail.com"><EmailIcon/></a>
      </div>
      <p>Byru Vishwajitha &middot; AI Engineer</p>
    </footer>
  );
}

export default Footer;
