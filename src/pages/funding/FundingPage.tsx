import * as styled from "./FundingPage.styles";
import { useState, useEffect } from "react";
import axios from "axios";

interface FundingProps {
  title: string;
  category: string;
  mainImageUrl: string;
  goalAmount: number;
  currentAmount: number;
  startDate: Date;
  endDate: Date;
  preorder: boolean;
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

function FundingPage() {
  const [loading, setLoading] = useState(true);
  const [funding, setFunding] = useState<FundingProps>({
    title: "",
    category: "",
    mainImageUrl: "",
    goalAmount: 0,
    currentAmount: 0,
    startDate: new Date(),
    endDate: new Date(),
    preorder: false,
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

  const percentAmount = Math.floor(
    (funding.currentAmount / funding.goalAmount) * 100
  );

  const formatPrice = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (date: Date): string => {
    return `${date.toString().slice(0, -16)}년 ${date
      .toString()
      .slice(5, -13)}월 ${date.toString().slice(8, -10)}일`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <styled.Container>
      <styled.AttainmentWrap>
        <styled.InfoWrap>
          <styled.PercentWrap>
            <styled.PercentLabel>{percentAmount}% 달성</styled.PercentLabel>
          </styled.PercentWrap>
          <styled.AmountWrap>
            <styled.CurrentAmountWrap>
              <styled.GoalAmountLabel>현재금액</styled.GoalAmountLabel>
              <styled.CurrentAmount>
                {formatPrice(funding.currentAmount)}원 /
              </styled.CurrentAmount>
            </styled.CurrentAmountWrap>
            <styled.GoalAmountWrap>
              <styled.GoalAmountLabel>목표금액</styled.GoalAmountLabel>
              <styled.GoalAmount>
                {formatPrice(funding.goalAmount)}원
              </styled.GoalAmount>
            </styled.GoalAmountWrap>
          </styled.AmountWrap>
        </styled.InfoWrap>
        <styled.ProcessWrap>
          <styled.PercentBarWrap>
            <styled.CurrentPercent $percent={`w-[${percentAmount}%]`}>
              <styled.CurrentPercentLabel>
                {percentAmount}
              </styled.CurrentPercentLabel>
            </styled.CurrentPercent>
            <styled.LeftPercent $percent={`w-[${100 - percentAmount}%]`}>
              <styled.CurrentPercentLabel>
                {100 - percentAmount}
              </styled.CurrentPercentLabel>
            </styled.LeftPercent>
          </styled.PercentBarWrap>
        </styled.ProcessWrap>
      </styled.AttainmentWrap>
      <styled.ContentsWrap>
        <styled.MainWrap>
          <styled.NavWrap>
            <styled.NavOnWrap>
              <styled.NavOnBtn>펀딩정보</styled.NavOnBtn>
            </styled.NavOnWrap>
            <styled.NavBtn>새소식</styled.NavBtn>
            <styled.NavBtn>서포터</styled.NavBtn>
            <styled.NavBtn>판매자정보</styled.NavBtn>
            <styled.NavBtn>환불정책</styled.NavBtn>
          </styled.NavWrap>
          <styled.FundingInfoWrap></styled.FundingInfoWrap>
        </styled.MainWrap>
        <styled.FloatingWrap>
          <styled.NavWrap>
            <styled.NavRightWrap>
              <styled.NavRightBtn>펀딩</styled.NavRightBtn>
            </styled.NavRightWrap>
          </styled.NavWrap>
          <styled.FloatingInfoWrap></styled.FloatingInfoWrap>
        </styled.FloatingWrap>
      </styled.ContentsWrap>
    </styled.Container>
  );
}
export default FundingPage;
