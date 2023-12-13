import React from "react";
import SignInPage from "../sign-in/SignInPage";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
    return(
        <>
        <SignInPage/>
        </>
    )
};

export default MainPage;