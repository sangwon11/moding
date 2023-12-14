import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage";
import MainPage from "./pages/main/MainPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="scrollbar bg-[#03000C] min-w-[1440px] w-auto min-h-screen h-auto">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
