import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

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
  StyledInput
} from "./SignInPage.styles";


function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
  };

  //  추후 코드 수정고려
  const handleLoginClick = async () => {
      try {
          const response = await axios.post('/api/v1/auth/sign-in', {
              email,
              password,
          });
          if (response.status === 201) {
              window.alert("성공적으로 로그인되었습니다.");
          } else if (response.status === 409) {
              window.alert("아이디와 비밀번호를 확인해주세요");
          } else {
              navigate("/404");
          }
      } catch (error) {
          console.log(error);
          navigate("/404");
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
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = '이메일 입력')}
                  onChange={handleEmailChange}
                  value={email}
              />

              <StyledInput
                  placeholder="비밀번호 입력"
                  type="password"
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = '비밀번호 입력')}
                  onChange={handlePasswordChange}
                  value={password}
              />

              <StyledButton onClick={handleLoginClick}>로그인하기</StyledButton>
              <NaverButton onClick={handleLoginClick}>네이버로 로그인하기</NaverButton>
              <KakaoButton onClick={handleLoginClick}>카카오로 로그인하기</KakaoButton>
          </StyledForm>
      </Container>
  );
};

export default SignInPage;

