import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"
import * as styled from "../../FundingRegPage.styles"

function RegGoal() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)

    const handleGoalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunding((prev) => ({ ...prev, goalAmount: e.target.value.replace(/[^0-9]/g, "") }))
    }

    const isDeliveryValid = () => funding.goalAmount.length >= 6

    const nextClick = () => {
        if (!isDeliveryValid()) {
            alert("목표금액을 입력해주세요.")
            return
        }
        navigate("../editor")
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>목표금액</styled.RegLabel>
            <styled.RegWrap>
                <styled.RegInput
                    value={funding.goalAmount}
                    onChange={handleGoalAmountChange}
                    maxLength={10}
                ></styled.RegInput>
                <styled.RegBtn onClick={nextClick}>진행하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegGoal
