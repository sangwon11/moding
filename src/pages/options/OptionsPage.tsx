import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "./OptionsPage.styles";
import axios from "axios";

interface FundingProps {
  title: string;
  options: OptionsProps[];
  deliveryPrice: number;
  deliveryDate: Date;
}
interface OptionsProps {
  _id: string;
  title: string;
  price: number;
  totalAmount: number;
  currentAmount: number;
  info: string;
}

function OptionsPage() {
  const navigate = useNavigate();
  const [supPrice, setSupPrice] = useState("0");
  const [optionSelect, setOptionSelect] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [funding, setFunding] = useState<FundingProps>({
    title: "",
    deliveryPrice: 0,
    deliveryDate: new Date(),
    options: [
      {
        _id: "",
        title: "",
        price: 0,
        totalAmount: 0,
        currentAmount: 0,
        info: "",
      },
    ],
  });

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupPrice(e.target.value.replace(/[^0-9]/g, ""));
  };

  const checkBoxClick = (check: boolean, item: OptionsProps) => {
    setOptionSelect((prevOptionSelect) => {
      if (check) {
        console.log(optionSelect);
        return [...prevOptionSelect, item._id];
      } else {
        console.log(optionSelect);
        return prevOptionSelect.filter((id) => id !== item._id);
      }
    });
  };

  const formatPrice = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (date: Date): string => {
    return `${date.toString().slice(0, -16)}년 ${date
      .toString()
      .slice(5, -13)}월 ${date.toString().slice(8, -10)}일`;
  };

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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <styled.Container>
      <styled.FundingTitle>{funding.title}</styled.FundingTitle>
      <styled.OptionsWrap>
        {funding.options.map((item, index) => (
          <styled.OptWrap key={index}>
            <styled.OptTop>
              <styled.OptCheckBox
                type="checkbox"
                onChange={(e) => checkBoxClick(e.target.checked, item)}
              ></styled.OptCheckBox>
              <styled.OptPrice>{formatPrice(item.price)}</styled.OptPrice>원
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
              <styled.DeliveryPrice>
                배송비 {formatPrice(funding.deliveryPrice)} 원
              </styled.DeliveryPrice>
              <styled.DeliveryDate>
                {formatDate(funding.deliveryDate)}부터 순차적으로 배송예정
              </styled.DeliveryDate>
            </styled.OptBot>
          </styled.OptWrap>
        ))}
      </styled.OptionsWrap>
      <styled.SupWrap>
        <styled.SubTitleWrap>
          <styled.SupTitle>후원하기 (선택)</styled.SupTitle>
        </styled.SubTitleWrap>
        <styled.SupPrice
          value={formatPrice(Number(supPrice))}
          onChange={onChangePrice}
          maxLength={9}
        ></styled.SupPrice>
        원
      </styled.SupWrap>
      <styled.PrivateWrap>
        <styled.SubTitleWrap>
          <styled.SupTitle>공개하기 (선택)</styled.SupTitle>
        </styled.SubTitleWrap>
        <styled.PrivateCheckWrap>
          <styled.NameCheckBox type="checkbox"></styled.NameCheckBox>
          <styled.PriceCheckBox type="checkbox"></styled.PriceCheckBox>
        </styled.PrivateCheckWrap>
      </styled.PrivateWrap>
      <styled.NextBtn
        onClick={() =>
          navigate("/payment", {
            state: {
              funding: funding,
              optionSelect: optionSelect,
              supPrice: supPrice,
            },
          })
        }
      >
        다음 단계로
      </styled.NextBtn>
    </styled.Container>
  );
}

export default OptionsPage;
