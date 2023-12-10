import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';

function Postcode(props: any) {
  const open = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    props.onChangeAddress(fullAddress);
    props.onChangePostcode(data.zonecode)
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <SearchAddressBtn onClick={handleClick}>주소검색
    </SearchAddressBtn>
  );
};

export default Postcode;

const SearchAddressBtn = styled.button`
    align-items: center;
    border-radius: 4px;
    justify-content: center;
    width: 80px;
    border: none;
    background-color: #0058a3;
    color: white;
    cursor: pointer;
    margin: 0 0 0 15px;
    height: 80%;

`