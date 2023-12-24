import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"
import * as styled from "../../FundingRegPage.styles"

function RegDelivery() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)

    const handleDeliveryPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunding((prev) => ({ ...prev, deliveryPrice: e.target.value.replace(/[^0-9]/g, '') }))
    }

    const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunding((prev) => ({ ...prev, deliveryDate: e.target.value }))
    }

    const isDeliveryValid = () => funding.deliveryDate.length !== 0 && funding.deliveryPrice.length !== 0

    const nextClick = () => {
        if (!isDeliveryValid ()) {
            alert("배송관련 요소를 입력해주세요.")
            return
        }
        navigate("../goal")
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>배송</styled.RegLabel>
            <styled.RegWrap>
                <styled.RegText>배송료</styled.RegText>
                <styled.RegInput value={funding.deliveryPrice} onChange={handleDeliveryPriceChange}></styled.RegInput>

                <styled.RegText>발송시작</styled.RegText>
                <styled.DateInput type="date" value={funding.deliveryDate} onChange={handleDeliveryDateChange} />
                <styled.DateLabel style={{ pointerEvents: "none" }} />

                <styled.RegBtn onClick={nextClick }>진행하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegDelivery
