import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar.tsx';
import MainPage from './Pages/MainPage/MainPage.tsx';
import ResultPage from './Pages/ResultPage/ResultPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;