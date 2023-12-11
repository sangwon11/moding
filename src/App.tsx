import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage";
import MainPage from './pages/main/MainPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
