import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Postcode from "../hooks/DaumPostPopUp";
import {checkValidEmail} from "../../utils/regExp.utils";
import {
    AddressWrap,
    Container,
    HalfInput,
    Input,
    NavLeftBtn,
    NavRightBtn,
    NavRightWrap,
    NavWrap, RegBtn,
    SignUpWrap,
    UnderTag
} from "./SingUpPage.styles";


function SignUpPage() {
    const navigate = useNavigate();

    const [formValid, setFormValid] = useState({
        isEmail: false,
    });
    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setFormValid({
                ...formValid,
                isEmail: false,
            });
        } else {
            setFormValid({
                ...formValid,
                isEmail: !checkValidEmail(e.target.value)
            });
        }
    }

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
        const {name, value} = e.target;
        const sanitizedValue =
            name === "phoneNumber" ? value.replace(/[^0-9]/g, "") : value;
        setFormData({...formData, [name]: sanitizedValue});
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

    const SetOnBlur = (e: React.FocusEvent<HTMLInputElement>, placeholder: string) => (e.target.placeholder = placeholder);

    const SetOnFocus = (e: React.FocusEvent<HTMLInputElement>) => (e.target.placeholder = "");

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
                    onBlur={(e) => SetOnBlur(e, "이메일 입력")}
                    onChange={onChangeInput}
                    onInput={handleEmailInput}
                    value={formData.email}
                    name="email"
                />
                <UnderTag $length={formValid.isEmail}>올바른 이메일 형태가 아닙니다.</UnderTag>

                <Input
                    placeholder="비밀번호 입력"
                    type="password"
                    onFocus={(e) => SetOnFocus(e)}
                    onBlur={(e) => SetOnBlur(e, "비밀번호 입력")}
                    onChange={onChangeInput}
                    value={formData.password}
                    name="password"
                />

                <Input
                    placeholder="이름 입력"
                    onFocus={(e) => SetOnFocus(e)}
                    onBlur={(e) => SetOnBlur(e, "이름 입력")}
                    onChange={onChangeInput}
                    value={formData.username}
                    name="username"
                />

                <Input
                    placeholder="전화번호 입력"
                    onFocus={(e) => SetOnFocus(e)}
                    onBlur={(e) => SetOnBlur(e, "전화번호 입력")}
                    onChange={onChangeInput}
                    value={formData.phoneNumber}
                    name="phoneNumber"
                    maxLength={11}
                />

                <AddressWrap>
                    <Postcode
                        onChangeAddress={(newAddress) => {
                            setFormData((prevData) => ({...prevData, address: newAddress}));
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

                <Input placeholder="주소" value={formData.address} disabled/>

                <Input
                    placeholder="상세주소 입력"
                    onFocus={(e) => SetOnFocus(e)}
                    onBlur={(e) => SetOnBlur(e, "상세주소 입력")}
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