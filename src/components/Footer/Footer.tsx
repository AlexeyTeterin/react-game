import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  const rsSchoolLink = (
    <a className="rsschool" href="https://rs.school/js/" target="_blank" rel="noreferrer"> </a>
  );

  const githubLink = (
    <a href="https://github.com/AlexeyTeterin" target="_blank" rel="noreferrer">Alexey Teterin</a>
  );

  const copyRight = (
    <div>
      &copy;
      2021
      coded by&nbsp;
      {githubLink}
    </div>
  );

  return (
    <footer className="footer">
      {rsSchoolLink}
      {copyRight}
    </footer>
  );
};

export default Footer;
