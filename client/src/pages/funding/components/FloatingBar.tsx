import * as styled from "../FundingPage.styles";
import { useNavigate } from "react-router-dom";
import {formatPrice,formatDate,formatPercentage,} from "../../../utils/format.utils";
import {fundingProps,optionsProps } from "../../../interface/schema.interface";

function FloatingBar({ funding }: { funding: fundingProps }) {
  const navigate = useNavigate();
  return (
    <styled.FloatingWrap>
      <styled.FloatingSticky>
        <styled.FloatingNavWrap>
          <styled.NavRightWrap>
            <styled.NavRightBtn>펀딩</styled.NavRightBtn>
          </styled.NavRightWrap>
        </styled.FloatingNavWrap>

        <styled.FloatingInfoWrap>
          <p>카테고리</p>
          <p>{funding.title}</p>
          <p>펀딩시작 : {formatDate(funding.startDate)}</p>
          <p>펀딩종료 : {formatDate(funding.endDate)}</p>
          <p>현재금액 : {formatPrice(funding.currentAmount)}원</p>
          <p>목표금액 : {formatPrice(funding.goalAmount)}원</p>
          <p>
            달성률 :{" "}
            {formatPercentage(funding.currentAmount, funding.goalAmount)}%
          </p>
          <button
            className="bg-blue-500"
            onClick={() =>
              navigate("/options", { state: { funding: funding } })
            }
          >
            펀딩하기
          </button>
        </styled.FloatingInfoWrap>
      </styled.FloatingSticky>
    </styled.FloatingWrap>
  );
}

export default FloatingBar;
