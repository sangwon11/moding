import { useNavigate } from "react-router-dom"
import * as styled from "../MyPage.styles"

function RegSeller() {
    const navigate = useNavigate()

    return (
        <styled.MeWrap>
            <styled.PageLabel>셀러등록</styled.PageLabel>
            <styled.SellerWrap>
                <styled.SellerBtn onClick={() => navigate("/")}>셀러신청</styled.SellerBtn>
                <styled.SellerBtn onClick={() => navigate("/seller/register")}>셀러페이지</styled.SellerBtn>
            </styled.SellerWrap>
        </styled.MeWrap>
    )
}

export default RegSeller
