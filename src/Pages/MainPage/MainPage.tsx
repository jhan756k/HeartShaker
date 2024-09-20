import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import Footer from '../../Components/Footer/Footer.tsx';
import NavBar from '../../Components/NavBar/NavBar.tsx';

const MainPage = () => {
  const [activeSection, setActiveSection] = useState('what-is-heartshaker');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedFileName, setSubmittedFileName] = useState<string | null>(null);
  const [isFileSubmitted, setIsFileSubmitted] = useState(false);

  const navigate = useNavigate();

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.name.toLowerCase().endsWith('.csv')) {
        setSelectedFile(file);
        console.log("File selected:", file);
      } else {
        alert("Please select a CSV file.");
        event.target.value = ''; // Reset the file input
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('https://ecg-sas-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("API response:", response.data);
      // Remove .csv extension and set the submitted file name
      const fileNameWithoutExtension = selectedFile.name.replace(/\.csv$/i, '');
      setSubmittedFileName(fileNameWithoutExtension);
      setIsFileSubmitted(true); // Enable the "Get Result" button only after successful submission
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsFileSubmitted(false); // Ensure button remains disabled if submission fails
    }
  };

  const handleGetResults = async () => {
    if (!submittedFileName) {
      console.log("No file has been submitted yet");
      return;
    }

    try {
      const response = await axios.post(`https://ecg-sas-backend.onrender.com/run_model/${submittedFileName}`);

      const predictionValue = await response.data.prediction;
      if (predictionValue !== undefined) {
        navigate('/results', { state: { prediction: predictionValue } });
      } else {
        console.error("No prediction value received");
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error getting results:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <>
      <NavBar />
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
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="file-upload-button">
                  Upload File
                </label>
                <button className="submit-file-button" onClick={handleSubmit}>
                  Submit File
                </button>
                <button 
                  className="get-result-button" 
                  onClick={handleGetResults}
                  disabled={!isFileSubmitted}
                >
                  Get Result
                </button>
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;