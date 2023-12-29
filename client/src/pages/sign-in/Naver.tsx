import React from "react";

const Naver = () => {
  const NAVER_CLIENT_ID = process.env.U5G5KKbNeYOgAmFO_zQK;
  const REDIRECT_URI = "http://localhost:3000/Naver"; // Callback URL
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return <button onClick={NaverLogin}>네이버 로그인</button>;
};

export default Naver;