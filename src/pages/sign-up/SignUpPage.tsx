import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Postcode from "../hooks/DaumPostPopUp";
import tw from "tailwind-styled-components";


function SignUpPage() {
  const navigate = useNavigate();
  
  const [emailValue, setEmailValue] = useState(false)

  const [valueData, setValueData] = useState({
    email: false,
  });

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const booleanValue = value === 'true' ? true : value === 'false' ? false : value;
    setValueData({ ...valueData, [name]: booleanValue });
  };
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    postCode: "",
    address: "",
    addressDetail: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {

      const isValid = isEmailValid(value);
      if (isValid) {
        setEmailValue(false);
      } else {
        setEmailValue(true);
      }
    }
    const sanitizedValue =
      name === "phoneNumber" ? value.replace(/[^0-9]/g, "") : value;
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const insertData = async () => {
    try {
      const response = await axios.post("/api/v1/auth/sign-up", formData);
      if (response.status === 201) {
        window.alert("성공적으로 가입되었습니다.");
        navigate("/");
      } else {
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          window.alert("이미 존재하는 이메일입니다.");
        } else {
          navigate("404");
        }
      }
    }
  };

  const confirmAlert = () => {
    if (window.confirm("추가하시겠습니까?")) {
      insertData();
    } else {
      return;
    }
  };

  const SetOnBlur = (e: React.FocusEvent<HTMLInputElement>, placeholder: string) =>(e.target.placeholder = placeholder);
  
  const SetOnFocus = (e: React.FocusEvent<HTMLInputElement>) =>(e.target.placeholder = "");

  return (
    <Container>
      <NavWrap>
        <NavLeftBtn>로그인</NavLeftBtn>
        <NavRightWrap>
          <NavRightBtn>회원가입</NavRightBtn>
        </NavRightWrap>
      </NavWrap>

      {/*회원가입*/}
      <SignUpWrap>
        <Input
          placeholder="이메일 입력"
          onFocus={(e) => SetOnFocus(e)}
          onBlur={(e) => SetOnBlur(e,"이메일 입력")}
          onChange={onChangeInput}
          value={formData.email}
          name="email"
        />
        <UnderTag $length={emailValue}>올바른 이메일 형태가 아닙니다.</UnderTag>

        <Input
          placeholder="비밀번호 입력"
          type="password"
          onFocus={(e) => SetOnFocus(e)}
          onBlur={(e) => SetOnBlur(e,"비밀번호 입력")}
          onChange={onChangeInput}
          value={formData.password}
          name="password"
        />

        <Input
          placeholder="이름 입력"
          onFocus={(e) => SetOnFocus(e)}
          onBlur={(e) => SetOnBlur(e,"이름 입력")}
          onChange={onChangeInput}
          value={formData.username}
          name="username"
        />

        <Input
          placeholder="전화번호 입력"
          onFocus={(e) => SetOnFocus(e)}
          onBlur={(e) => SetOnBlur(e,"전화번호 입력")}
          onChange={onChangeInput}
          value={formData.phoneNumber}
          name="phoneNumber"
          maxLength={11}
        />

        <AddressWrap>
          <Postcode
            onChangeAddress={(newAddress) => {
              setFormData((prevData) => ({ ...prevData, address: newAddress }));
            }}
            onChangePostcode={(newPostcode) => {
              setFormData((prevData) => ({
                ...prevData,
                postCode: newPostcode,
              }));
            }}
          />
          <HalfInput
            placeholder="우편번호"
            value={formData.postCode}
            name="postCode"
            disabled
          />
        </AddressWrap>

        <Input placeholder="주소" value={formData.address} disabled />

        <Input
          placeholder="상세주소 입력"
          onFocus={(e) => SetOnFocus(e)}
          onBlur={(e) => SetOnBlur(e,"상세주소 입력")}
          onChange={onChangeInput}
          value={formData.addressDetail}
          name="addressDetail"
        />

        <RegBtn onClick={confirmAlert}>회원가입하기</RegBtn>
      </SignUpWrap>
    </Container>
  );
}

export default SignUpPage;

interface UnderTagProps{
  $length: boolean;
}

const UnderTag = tw.p<UnderTagProps>`
  text-sm font-normal
  ${(p) => (p.$length ? "text-red-500" : "text-transparent")}`

const Container = tw.div`
  py-28 flex flex-col items-center`;
const NavWrap = tw.div`
  flex justify-between w-[600px] text-lg font-bold text-white text-center`;
const NavLeftBtn = tw.button`
  bg-[#D9D9D9]/[.1] w-[150px] h-[52px] rounded-[24px]`;
const NavRightWrap = tw.div`
  w-[240px] h-[60px] rounded-tr-[24px] border-b-[60px] border-b-[#D9D9D9]/[.1] border-r-[60px] border-r-[#D9D9D9]/[.1] border-l-[60px] border-l-transparent`;
const NavRightBtn = tw.button`
  w-[150px] h-[52px]`;
const SignUpWrap = tw.div`
bg-[#D9D9D9]/[.1] w-[600px] h-[800px] text-white text-lg font-bold rounded-[24px] rounded-tr-[0px] flex flex-col pt-4 justify-center items-center`;

const HalfInput = tw.input`
bg-[#D9D9D9]/[.1] w-[180px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5] my-2`;
const Input = tw.input`
bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5] my-2`;

const AddressWrap = tw.div`
space-x-10`;
const RegBtn = tw.button`
bg-[#D9D9D9]/[.5] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px]`;
