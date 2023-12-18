import { useLocation } from "react-router-dom";
import * as styled from "./PaymentPage.styles";
import Payment from "../../components/Pay"

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

function PaymentPage() {
  const state = useLocation().state;
  const funding = state.funding;
  const optionSelect = state.optionSelect;
  const supPrice = state.supPrice;
  const selectedOptions = funding.options.filter((item: OptionsProps) =>
    optionSelect.includes(item._id)
  );

  const formatPrice = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <styled.Container>
      <styled.ContentsWrap>
        <styled.TotalPriceWrap>
          {selectedOptions.map((item: OptionsProps, index: number) => (
            <styled.OptionWrap key={index}>
              <styled.OptionTitle>{item.title}</styled.OptionTitle>
              <styled.OptionInfo>{item.info}</styled.OptionInfo>
              <styled.OptionPrice>
                {formatPrice(item.price)}원
              </styled.OptionPrice>
            </styled.OptionWrap>
          ))}
          <styled.SupPriceWrap>
            <styled.SupPrice>{formatPrice(supPrice)}원</styled.SupPrice>
          </styled.SupPriceWrap>
          <styled.DeliveryPriceWrap>
            <styled.DeliveryPrice>{formatPrice(funding.deliveryPrice)}원</styled.DeliveryPrice>
          </styled.DeliveryPriceWrap>
        </styled.TotalPriceWrap>
      </styled.ContentsWrap>
      <Payment></Payment>
    </styled.Container>
  );
}

export default PaymentPage;
