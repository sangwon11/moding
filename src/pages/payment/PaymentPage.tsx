import * as styled from "./PaymentPage.styles";

function PaymentPage() {
  const optItems = [
    {  },
  ];
  return (
    <styled.Container>
      <styled.OptionsWrap>
        {optItems.map((item, index) => (
          <styled.OptWrap>
            <styled.OptTop>
              <styled.OptCheckBox></styled.OptCheckBox>
              <styled.OptPrice></styled.OptPrice>
            </styled.OptTop>
            <styled.OptMid>
              <styled.OptTitle></styled.OptTitle>
              <styled.OptCurrentAmount></styled.OptCurrentAmount>
              <styled.OptTotalAmount></styled.OptTotalAmount>
            </styled.OptMid>
            <styled.OptInfo></styled.OptInfo>
            <styled.OptBot></styled.OptBot>
          </styled.OptWrap>
        ))}
      </styled.OptionsWrap>
    </styled.Container>
  );
}

export default PaymentPage;
