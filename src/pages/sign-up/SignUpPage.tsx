import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Postcode from "../hooks/DaumPostPopUp";

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
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
    <Container>
      <MarkUp>회원추가</MarkUp>
      <GridTable>
        <GridCell>
            <Tag>이메일</Tag>
            <InputBox onChange={onChangeEmail} value={emailReg} />
        </GridCell>

        <GridCell>
            <Tag>비밀번호</Tag>
            <InputBox onChange={onChangePassword} value={passwordReg} />
        </GridCell>

        <GridCell>
            <Tag>이름</Tag>
            <InputBox onChange={onChangeUserName} value={userNameReg} />
        </GridCell>

        <GridCell>
            <Tag>전화번호</Tag>
            <InputBox onChange={onChangePhoneNumber} value={phoneNumberReg} maxLength={15}/>
        </GridCell>

        <GridCell>
            <AddressBox>
                <Tag>주소,우편번호</Tag>
                <Postcode onChangeAddress={onChangeAddress} onChangePostcode={onChangePostcode}/>
            </AddressBox>
            <InputBox value={postcodeReg} />
            <InputBox value={addressReg} />
        </GridCell>

          <GridCell>
            <Tag>상세주소</Tag>
            <InputBox
              onChange={onChangeAddressDetail} value={addressDetailReg}/>
          </GridCell>

        <SubmitBtn onClick={ConfirmAlert}>추가</SubmitBtn>
      </GridTable>
    </Container>
  );
};

export default SignUpPage;

/* Styled */

const checkInputLength = (props: any) => {
  if (props.value.length !== 0 && props.value.length < props.length) {
    return "solid 1px #e00751;";
  } else {
    return "solid 1px black;";
  }
};

const checkInputLengthFocus = (props: any) => {
  if (props.value.length !== 0 && props.value.length < props.length) {
    return `border: solid 1px #e00751;
            box-shadow: 0px 0px 0px 1.5px #e00751;`;
  } else {
    return `border: solid 1px #0058a3;
            box-shadow: 0px 0px 0px 1.5px #0058a3;`;
  }
};

const MarkUp = styled.h2`
  color: darkgrey;
  margin: 20px;
`;
const Container = styled.div`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
`;
const GridTable = styled.div`
  display: grid;
  width: 800px;
  justify-items: center;
`;
const GridCell = styled.div`
  margin: 0 20px;
  width: 100%;
  padding: 0;
`;
const Tag = styled.p`
  margin: 0 0 5px 0;
  font-size: 0.8rem;
`;
const InputBox = styled.input`
  width: 100%;
  border: ${checkInputLength};
  font-size: 1rem;
  border-radius: 4px;
  flex-grow: 1;
  height: 3rem;
  outline: none;
  overflow: hidden;
  padding: 0;
  padding-inline-end: 0.5rem;
  padding-inline-start: 0.5rem;
  background: none;
  &:focus {
    outline: none;
    ${checkInputLengthFocus};
  }
`;
const SelectBox = styled.select`
  border: solid 1px black;
  position: relative;
  width: 105%;
  font-size: 1rem;
  border-radius: 4px;
  flex-grow: 1;
  height: 3rem;
  outline: none;
  overflow: hidden;
  padding: 0;
  padding-inline-end: 0.5rem;
  padding-inline-start: 0.5rem;
  background: none;
  &:focus {
    outline: none;
  }
`;
const AddressBox = styled.div`
  display: inline-flex;
  padding: 0px;
  margin: 0px;
`;
const SubmitBtn = styled.button`
  align-items: center;
  border-radius: 64px;
  justify-content: center;
  min-height: 3.5rem;
  width: 300px;
  border: none;
  background-color: #0058a3;
  color: white;
  cursor: pointer;
`;
