import * as styled from "../FundingPage.styles";
import { fundingProps, optionsProps } from "../../../interface/schema.interface";

function FundingInfo({ funding }: { funding: fundingProps }) {
  return (
    <styled.FundingInfoWrap>
      <styled.MainImgWrap>
        <styled.MainImg src={funding.mainImageUrl}></styled.MainImg>
      </styled.MainImgWrap>
    </styled.FundingInfoWrap>
  );
}

export default FundingInfo;
