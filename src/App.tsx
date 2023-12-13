import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage";
import MainPage from './pages/main/MainPage';
import Header from './components/Header';
import ErrorPage from './pages/Error/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <div className='scrollbar bg-[#03000C] v-screen min-h-screen h-auto'>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/404" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
