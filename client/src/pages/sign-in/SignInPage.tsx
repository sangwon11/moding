import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { HeaderRenderAtom } from "../../recoil/HeaderRenderAtom";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Container,
  KakaoButton,
  NavContainer,
  NaverButton,
  NavLeftButton,
  NavLeftContainer,
  NavRightButton,
  NavRightContainer,
  StyledButton,
  StyledForm,
  StyledInput,
} from "./SignInPage.styles";
import { axiosInstance } from "../../utils/axios.utils";

function SignInPage() {
    // 위동현 : Recoil 헤더 리렌더링 전역변수 선언
  const setHeaderRender = useSetRecoilState(HeaderRenderAtom);

  const headerRender = () => {
    setHeaderRender((prevCount) => prevCount + 1);
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 위동현 : 에러처리방식, 헤더리렌더 전역변수 추가
  const handleLoginClick = async () => {
    try {
      const response = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });
      if (response.status === 201) {
        window.alert("성공적으로 로그인되었습니다.");
        Cookies.set("jwt", response.data.data.toString(), { expires: 1 });
        headerRender();
        navigate("/");
      } else {
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          window.alert("아이디와 비밀번호를 확인해주세요");
        } else {
          navigate("/404");
        }
      }
    }
  };

  return (
    <Container>
      <NavContainer>
        <NavLeftContainer>
          <NavLeftButton>로그인</NavLeftButton>
        </NavLeftContainer>

        <NavRightContainer>
          <NavRightButton to="/sign-up">회원가입</NavRightButton>
        </NavRightContainer>
      </NavContainer>
      <StyledForm>
        <StyledInput
          placeholder="이메일 입력"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "이메일 입력")}
          onChange={handleEmailChange}
          value={email}
        />

        <StyledInput
          placeholder="비밀번호 입력"
          type="password"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "비밀번호 입력")}
          onChange={handlePasswordChange}
          value={password}
        />

        <StyledButton onClick={handleLoginClick}>로그인하기</StyledButton>
        <NaverButton onClick={handleLoginClick}>
          네이버로 로그인하기
        </NaverButton>
        <KakaoButton onClick={handleLoginClick}>
          카카오로 로그인하기
        </KakaoButton>
      </StyledForm>
    </Container>
  );
}

export default SignInPage;
