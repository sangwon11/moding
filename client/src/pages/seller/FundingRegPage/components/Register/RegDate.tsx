import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"
import * as styled from "../../FundingRegPage.styles"

function RegDate() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunding((prev) => ({ ...prev, startDate: e.target.value }))
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunding((prev) => ({ ...prev, endDate: e.target.value }))
    }

    const isDateValid = () => funding.startDate.length !== 0 && funding.endDate.length !== 0

    const nextClick = () => {
        if (!isDateValid()) {
            alert("펀딩기간을 선택해주세요.")
            return
        }
        navigate("../delivery")
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>펀딩기간</styled.RegLabel>
            <styled.RegWrap>
                <styled.RegText>펀딩시작</styled.RegText>
                <styled.DateInput type="date" value={funding.startDate} onChange={handleStartDateChange} />
                <styled.DateLabel style={{ pointerEvents: "none" }} />

                <styled.RegText>펀딩종료</styled.RegText>
                <styled.DateInput type="date" value={funding.endDate} onChange={handleEndDateChange} />
                <styled.DateLabel style={{ pointerEvents: "none" }} />

                <styled.RegBtn onClick={nextClick}>진행하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegDate
