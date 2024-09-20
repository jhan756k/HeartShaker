import MainPage from "./Pages/MainPage/MainPage.tsx";
import React from 'react';
import NavBar from './Components/NavBar/NavBar.tsx';

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainPage />
    </div>
  );
}

export default App;
