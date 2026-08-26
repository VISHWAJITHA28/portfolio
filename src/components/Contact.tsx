import React from 'react';
import '../assets/styles/Contact.scss';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// No form here on purpose. A contact form needs a backend or a third-party
// service behind it, and one that quietly fails costs you the message without
// telling anyone. A mailto link cannot fail.

const LINKS = [
  {
    icon: <EmailIcon fontSize="large" />,
    label: 'Email',
    value: 'byruvishwajitha@gmail.com',
    href: 'mailto:byruvishwajitha@gmail.com',
  },
  {
    icon: <LinkedInIcon fontSize="large" />,
    label: 'LinkedIn',
    value: 'vishwajithabyru28',
    href: 'https://www.linkedin.com/in/vishwajithabyru28/',
  },
  {
    icon: <GitHubIcon fontSize="large" />,
    label: 'GitHub',
    value: 'VISHWAJITHA28',
    href: 'https://github.com/VISHWAJITHA28',
  },
];

function Contact() {
  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>
            Working on something interesting? Building in a field I have not touched yet?
            Either way, I would like to hear about it. The quickest way to reach me is email.
          </p>

          <div className="contact-links">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="contact-link"
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="contact-link-icon">{l.icon}</span>
                <span className="contact-link-text">
                  <span className="contact-link-label">{l.label}</span>
                  <span className="contact-link-value">{l.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
