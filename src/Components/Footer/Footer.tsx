import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span className="logo-heart">Heart</span>
          <span className="logo-shaker">Shaker</span>
        </div>
        <div className="footer-info">
          <p>
            <a href="mailto:jhan756k@gmail.com">
              <i className="fas fa-envelope"></i> jhan756k@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+821085517793">
              <i className="fas fa-phone"></i> (+82) 10 8551 7793
            </a>
          </p>
          <p>
            <a href="https://www.google.com/maps/search/?api=1&query=800+Bonghwa-ro,+Anheung-myeon,+Gangwon-do,+Korea" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-map-marker-alt"></i> 800 Bonghwa-ro, Anheung-myeon, Gangwon-do, Korea
            </a>
          </p>
        </div>
        <div className="footer-social">
          <a href="https://github.com/jhan756k" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          {/* Add more social media links here if needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;