import { useNavigate } from "react-router-dom"
import * as styled from "../../FundingRegPage.styles"
import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../../../../../utils/axios.utils"
import { frontEndAuthMiddleware } from "../../../../../utils/jwtUtils"
import { useRecoilState } from "recoil"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"

function RegComplete() {
    const navigate = useNavigate()

    const [funding, setFunding] = useRecoilState(fundingRegAtom)

    const addFunding = async () => {
        try {
            const config = await frontEndAuthMiddleware({
                method: "post",
                url: "/seller",
                data: funding,
            })

            const response = await axiosInstance.request(config)
            if (response.status === 201) {
                window.alert("펀딩이 등록되었습니다.")
                navigate("/")
            } else {
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("펀딩등록에 실패했습니다.")
                } else {
                    window.alert("펀딩등록에 실패했습니다.")
                }
            }
        }
    }


    const completeClick = () => {
        addFunding();
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>완료하기</styled.RegLabel>
            <styled.RegWrap>
                <styled.RegBtn onClick={completeClick}>완료하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegComplete
