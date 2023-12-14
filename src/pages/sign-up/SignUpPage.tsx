import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Postcode from "../hooks/DaumPostPopUp";

function SignUpPage() {
  const navigate = useNavigate();

  const [emailReg, setEmailReg] = useState<string>("");
  const [passwordReg, setPasswordReg] = useState<string>("");
  const [userNameReg, setUserNameReg] = useState<string>("");
  const [phoneNumberReg, setPhoneNumberReg] = useState<string>("");
  const [postcodeReg, setPostcodeReg] = useState<string>("");
  const [addressReg, setAddressReg] = useState<string>("");
  const [addressDetailReg, setAddressDetailReg] = useState<string>("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailReg(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordReg(e.target.value);
  };
  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameReg(e.target.value);
  };
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberReg(e.target.value.replace(/[^0-9]/g, ""));
  };
  const onChangePostcode = (postcode: string) => {
    setPostcodeReg(postcode);
  };
  const onChangeAddress = (address: string) => {
    setAddressReg(address);
  };
  const onChangeAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetailReg(e.target.value);
  };

  const insertData = async () => {
    try {
      const response = await axios.post("/api/v1/auth/sign-up", {
        email: emailReg,
        password: passwordReg,
        username: userNameReg,
        phoneNumber: phoneNumberReg,
        postCode: postcodeReg,
        address: addressReg,
        addressDetail: addressDetailReg,
      });
      if (response.status === 201) {
        window.alert("성공적으로 가입되었습니다.");
        navigate("/");
      } else {
        window.alert("이미 존재하는 이메일입니다.");
      }
    } catch (error) {
      console.log(error);
      if (error === 409) {
        window.alert("이미 존재하는 이메일입니다.");
      } else {
        navigate("/404");
      }
    }
  };

  const ConfirmAlert = () => {
    if (window.confirm("추가하시겠습니까?")) {
      insertData();
    } else {
      return;
    }
  };

  return (
    <div className="py-28 flex flex-col items-center">
      {/*nav*/}
      <div className="flex justify-between w-[600px] text-lg font-bold text-white text-center">
        {/*nav left*/}
        <button className="bg-[#D9D9D9]/[.1] w-[150px] h-[52px] rounded-[24px]">
          로그인
        </button>
        {/*nav right*/}
        <div className="w-[240px] h-[60px] rounded-tr-[24px] border-b-[60px] border-b-[#D9D9D9]/[.1] border-r-[60px] border-r-[#D9D9D9]/[.1] border-l-[60px] border-l-transparent">
          <button className="w-[150px] h-[52px]">회원가입</button>
        </div>
      </div>
      {/*회원가입*/}
      <div className="bg-[#D9D9D9]/[.1] w-[600px] h-[800px] text-white text-lg font-bold rounded-[24px] rounded-tr-[0px] flex flex-col space-y-8 justify-center items-center">
        <input
          className="bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]"
          placeholder="이메일 입력"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "이메일 입력")}
          onChange={onChangeEmail}
          value={emailReg}
        />

        <input
          className="bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]"
          placeholder="비밀번호 입력"
          type="password"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "비밀번호 입력")}
          onChange={onChangePassword}
          value={passwordReg}
        />

        <input
          className="bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]"
          placeholder="이름 입력"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "이름 입력")}
          onChange={onChangeUserName}
          value={userNameReg}
        />

        <input
          className="bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]"
          placeholder="전화번호 입력"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "전화번호 입력")}
          onChange={onChangePhoneNumber}
          value={phoneNumberReg}
          maxLength={15}
        />

        <div className="space-x-10">
          <Postcode
            onChangeAddress={onChangeAddress}
            onChangePostcode={onChangePostcode}
          />
          <input
            className="bg-[#D9D9D9]/[.1] w-[180px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]"
            placeholder="우편번호"
            value={postcodeReg}
            disabled
          />
        </div>

        <input
          className="bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]"
          placeholder="주소"
          value={addressReg}
          disabled
        />

        <input
          className="bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] placeholder:text-white/[0.5]"
          placeholder="상세주소 입력"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "상세주소 입력")}
          onChange={onChangeAddressDetail}
          value={addressDetailReg}
        />

        <button
          className="bg-[#D9D9D9]/[.5] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px]"
          onClick={ConfirmAlert}
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
