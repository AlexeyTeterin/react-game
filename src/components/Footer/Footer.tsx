import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <a
      className="rsschool"
      href="https://rs.school/"
      target="_blank"
      rel="noreferrer"
    >
      {' '}
    </a>
    <div>
      &copy;
      2021
      coded by&nbsp;
      <a
        href="https://github.com/AlexeyTeterin"
        target="_blank"
        rel="noreferrer"
      >
        Alexey Teterin
      </a>
    </div>
  </footer>
);

export default Footer;
