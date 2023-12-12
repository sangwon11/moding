import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage";
import MainPage from './pages/main/MainPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='bg-[#03000C] v-screen h-screen'>
        <Header />
        <Routes>
          <Route path="/asd" element={<MainPage />} />
          <Route path="/" element={<SignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
