import { useEffect, useState } from "react";
import * as styled from "./PaymentPage.styles";
import axios from "axios";

interface ItemProps {
  price: number;
}
interface FundingProps {
  title: string;
  options: OptionsProps[];
}
interface OptionsProps {
  id: string;
  title: string;
  price: number;
  totalAmount: number;
  currentAmount: number;
  info: string;
  deliveryPrice: number;
  deliveryDate: Date;
}

function PaymentPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [supPrice, setSupPrice] = useState("");

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupPrice(e.target.value.replace(/[^0-9]/g, ""));
  };

  const CheckBoxClick = (check: boolean, item: ItemProps) => {
    if (check) {
      setTotalPrice(totalPrice + item.price);
    } else {
      setTotalPrice(totalPrice - item.price);
    }
  };

  const [funding, setFunding] = useState<FundingProps>({
    title: "",
    options: [
      {
        id: "",
        title: "",
        price: 0,
        totalAmount: 0,
        currentAmount: 0,
        info: "",
        deliveryPrice: 0,
        deliveryDate: new Date(),
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/v1/fundings/657d2c31e09645b53dd9c7c4"
        );
        setFunding(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행하도록 합니다.

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <styled.Container>
      <styled.FundingTitle>{funding.title}</styled.FundingTitle>
      <styled.OptionsWrap>
        {funding.options.map((item, index) => (
          <styled.OptWrap key={item.id}>
            <styled.OptTop>
              <styled.OptCheckBox
                type="checkbox"
                onChange={(e) => CheckBoxClick(e.target.checked, item)}
              ></styled.OptCheckBox>
              <styled.OptPrice>{item.price}</styled.OptPrice>
            </styled.OptTop>
            <styled.OptMid>
              <styled.OptTitle>{item.title}</styled.OptTitle>
              <styled.OptCurrentAmount>
                {item.totalAmount - item.currentAmount}개 남음
              </styled.OptCurrentAmount>
              <styled.OptTotalAmount>
                제한수량 {item.totalAmount}개
              </styled.OptTotalAmount>
            </styled.OptMid>
            <styled.OptInfo>{item.info}</styled.OptInfo>
            <styled.OptBot>
              <styled.DeliveryPrice>{item.deliveryPrice}</styled.DeliveryPrice>
              <styled.DeliveryDate>
                부터 순차적으로 배송예정
              </styled.DeliveryDate>
            </styled.OptBot>
          </styled.OptWrap>
        ))}
      </styled.OptionsWrap>
      <styled.SupWrap>
        <styled.SupPrice
          value={supPrice}
          onChange={onChangePrice}
        ></styled.SupPrice>
      </styled.SupWrap>
      <styled.PrivateWrap>
        <styled.NameCheckBox type="checkbox"></styled.NameCheckBox>
        <styled.PriceCheckBox type="checkbox"></styled.PriceCheckBox>
      </styled.PrivateWrap>
      <styled.TotalPrice>{totalPrice + Number(supPrice)}</styled.TotalPrice>
      <styled.NextBtn>다음 단계로</styled.NextBtn>
    </styled.Container>
  );
}

export default PaymentPage;
