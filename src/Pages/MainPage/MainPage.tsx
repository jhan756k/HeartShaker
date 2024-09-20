import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Footer from '../../Components/Footer/Footer.tsx';

const MainPage = () => {
  const [activeSection, setActiveSection] = useState('what-is-heartshaker');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['what-is-heartshaker', 'how-it-works', 'upload-ecg'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const pageBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) ||
            (i === sections.length - 1 && pageBottom === documentHeight)
          ) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = window.innerWidth <= 768 ? 60 : 70; // Adjust based on mobile or desktop
      const offset = 20;
      const sectionPosition = section.offsetTop - navbarHeight - offset;

      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="page-wrapper">
      <div className='main-page'>
        <aside className="sidebar">
          <nav>
            <ul>
              <li><a href="#what-is-heartshaker" onClick={(e) => { e.preventDefault(); scrollToSection('what-is-heartshaker'); }} className={activeSection === 'what-is-heartshaker' ? 'active' : ''}>What is HeartShaker?</a></li>
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className={activeSection === 'how-it-works' ? 'active' : ''}>How it Works</a></li>
              <li><a href="#upload-ecg" onClick={(e) => { e.preventDefault(); scrollToSection('upload-ecg'); }} className={activeSection === 'upload-ecg' ? 'active' : ''}>Upload ECG Data</a></li>
            </ul>
          </nav>
        </aside>
        <main className="content">
          <section id="what-is-heartshaker" className="project-explanation">
            <h2>What is HeartShaker?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
              nunc id aliquam tincidunt, nisi nunc tincidunt urna, nec tincidunt nunc 
              nunc nec nunc. Sed euismod, nunc id aliquam tincidunt, nisi nunc 
              tincidunt urna, nec tincidunt nunc nunc nec nunc.
            </p>
          </section>
          <section id="how-it-works" className="project-explanation">
            <h2>How does HeartShaker work?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
              nunc id aliquam tincidunt, nisi nunc tincidunt urna, nec tincidunt nunc 
              nunc nec nunc. Sed euismod, nunc id aliquam tincidunt, nisi nunc 
              tincidunt urna, nec tincidunt nunc nunc nec nunc.
            </p>
          </section>
          <section id="upload-ecg" className="project-explanation">
            <h2>Upload ECG Data</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
              nunc id aliquam tincidunt, nisi nunc tincidunt urna, nec tincidunt nunc 
              nunc nec nunc. Sed euismod, nunc id aliquam tincidunt, nisi nunc 
              tincidunt urna, nec tincidunt nunc nunc nec nunc.
            </p>
            <div className="file-upload-container">
              <input
                type="file"
                id="file-upload"
                className="file-upload-input"
              />
              <label htmlFor="file-upload" className="file-upload-button">
                Upload File
              </label>
              <button className="submit-file-button" onClick={() => console.log("File submitted")}>
                Submit File
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;