import React from "react";

const Kakao = () => {
    const REST_API_KEY = '백엔드한테 달라하자1';
    const REDIRECT_URI = '백엔드한테 달라하자2';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const loginHandler = () => {
      window.location.href = link;
    };
  
    return (
      <button type='button' onClick={loginHandler}>
       카카오 로그인
      </button>
    );
  };

  export default Kakao;