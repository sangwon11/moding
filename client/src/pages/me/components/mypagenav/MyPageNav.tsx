import { useNavigate } from "react-router-dom"
import * as styled from "./MyPageNav.styles"
import RegSeller from "../RegSeller"

function MyPageNav() {
    const navigate = useNavigate()

    return (
        <styled.NavWrap>
            <styled.NavBtn onClick={()=>navigate("")}>마이페이지</styled.NavBtn>
            <styled.NavBtn onClick={()=>navigate("./order")}>구매목록</styled.NavBtn>
            <styled.NavBtn onClick={()=>navigate("./seller")}>샐러등록</styled.NavBtn>
        </styled.NavWrap>
    )
}

export default MyPageNav
