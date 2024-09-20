import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ResultPage.css';

interface LocationState {
  prediction: any; // Change this to 'any' to accept any type
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const renderPrediction = () => {
    if (state && state.prediction !== undefined) {
      const predictionValue = Number(state.prediction);
      if (!isNaN(predictionValue)) {
        const percentageValue = (predictionValue * 100).toFixed(2);
        return (
          <div className="result-container">
            <h2>Prediction</h2>
            <p>Possibility of Sleep Apnea: {percentageValue}%</p>
          </div>
        );
      } else {
        return <p>Invalid prediction value received.</p>;
      }
    } else {
      return <p>No results available. Please try analyzing your ECG data again.</p>;
    }
  };

  return (
    <div className="result-page">
      <h1>ECG Analysis Result</h1>
      {renderPrediction()}
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
};

export default ResultPage;