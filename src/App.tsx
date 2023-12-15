import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import SignUpPage from "./pages/sign-up/SignUpPage";
import MainPage from "./pages/main/MainPage";
import Header from "./components/header/Header";
import ErrorPage from "./pages/Error/ErrorPage";
import Main from "./pages/hooks/custompopup/main";
import SignInPage from "./pages/sign-in/SignInPage";
import Category from "./pages/category/Category";

function App() {
  return (
    <BrowserRouter>
      <div className="scrollbar bg-[#03000C] min-w-[1440px] w-auto min-h-screen h-auto">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/processing" element={<Main />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/category" element={<Category />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
