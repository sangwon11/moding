import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Postcode from "../hooks/DaumPostPopUp";

interface SignUpPageProps {}

const SignUpPage = (props: SignUpPageProps) => {
    const navigate = useNavigate();

    const [emailReg, setEmailReg] = useState<string>("");
    const [passwordReg, setPasswordReg] = useState<string>("");
    const [userNameReg, setUserNameReg] = useState<string>("");
    const [phoneNumberReg, setPhoneNumberReg] = useState<string>("");
    const [postcodeReg, setPostcodeReg] = useState<string>("");
    const [addressReg, setAddressReg] = useState<string>("");
    const [addressDetailReg, setAddressDetailReg] = useState<string>("");

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {setEmailReg(e.target.value);};
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {setPasswordReg(e.target.value);};
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {setUserNameReg(e.target.value);};
    const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {setPhoneNumberReg(e.target.value.replace(/[^0-9]/g, ""));};
    const onChangePostcode = (postcode: string) => {setPostcodeReg(postcode);};
    const onChangeAddress = (address: string) => {setAddressReg(address);};
    const onChangeAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {setAddressDetailReg(e.target.value);};

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
            console.log(response);
            } catch (error) {
            console.log(error);
        }
    };

    const ConfirmAlert = () => {
        if (window.confirm("추가하시겠습니까?")) {
        insertData();
        navigate("/");
        } else {
        return;
        }
    };

  return (
    <div>
      <p>회원추가</p>
        <div>
            <p>이메일</p>
            <input onChange={onChangeEmail} value={emailReg} />
        </div>

        <div>
            <p>비밀번호</p>
            <input onChange={onChangePassword} value={passwordReg} />
        </div>

        <div>
            <p>이름</p>
            <input onChange={onChangeUserName} value={userNameReg} />
        </div>

        <div>
            <p>전화번호</p>
            <input onChange={onChangePhoneNumber} value={phoneNumberReg} maxLength={15}/>
        </div>

        <div>
            <div>
                <p>주소,우편번호</p>
                <Postcode onChangeAddress={onChangeAddress} onChangePostcode={onChangePostcode}/>
            </div>
            <input value={postcodeReg} />
            <input value={addressReg} />
        </div>

          <div>
            <p>상세주소</p>
            <input
              onChange={onChangeAddressDetail} value={addressDetailReg}/>
          </div>

        <button onClick={ConfirmAlert}>추가</button>
    </div>
  );
};

export default SignUpPage;
