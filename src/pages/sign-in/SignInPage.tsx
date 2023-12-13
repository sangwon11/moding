import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';

interface NavLinkProps {
    to: string;
  }

const Container = tw.div`
  py-28 flex flex-col items-center 
`;

const NavContainer = tw.div`
  flex justify-between w-[600px] text-lg font-bold text-white text-center
`;

const NavLeftContainer = tw.div`
  w-[240px] h-[60px] rounded-tr-[24px]  border-b-[60px] border-b-[#D9D9D9]/[.1] border-l-[35px] border-l-[#D9D9D9]/[.1] border-r-[60px] border-r-transparent
`;

const NavLeftButton = tw.button`
  w-[150px] h-[52px]
`;


const NavRightContainer = tw.div`
bg-[#D9D9D9]/[.1] bg-opacity-10 w-[150px] h-[52px] rounded-[24px] border-t-[10px]
`;


const NavRightButton = tw(Link)<NavLinkProps>`
  w-[150px] h-[52px] 
`;


const StyledForm = tw.div`
  bg-[#D9D9D9]/[.1] w-[600px] h-[600px] text-white text-lg font-bold rounded-[24px] rounded-tl-[0px] flex flex-col space-y-8 justify-center items-center
`;

const StyledInput = tw.input`
  bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]
`;

const StyledButton = tw.button`
  bg-[#D9D9D9]/[.5] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px]
`;
const NaverButton =tw.button`
bg-green-500 w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px]
`
const KakaoButton =tw.button`
bg-yellow-400 w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px]
`

function SignInPage () {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginUser = async () => {
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
        <NavRightButton to ="/sign-up">회원가입</NavRightButton>
        </NavRightContainer>
      </NavContainer>
      <StyledForm>
        <StyledInput
          placeholder="이메일 입력"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = '이메일 입력')}
          onChange={onChangeEmail}
          value={email}
        />

        <StyledInput
          placeholder="비밀번호 입력"
          type="password"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = '비밀번호 입력')}
          onChange={onChangePassword}
          value={password}
        />

        <StyledButton onClick={loginUser}>로그인하기</StyledButton>
        <NaverButton onClick={loginUser}>네이버로 로그인하기</NaverButton>
        <KakaoButton onClick={loginUser}>카카오로 로그인하기</KakaoButton>
      </StyledForm>
    </Container>
  );
};

export default SignInPage;
