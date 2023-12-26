import { useNavigate } from "react-router-dom"
import * as styled from "../../FundingRegPage.styles"
import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../../../../../utils/axios.utils"
import { frontEndAuthMiddleware } from "../../../../../utils/jwtUtils"
import { useRecoilState } from "recoil"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"

interface userProps {
    _id: string
    username: string
}
function RegStart() {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        _id: "",
        username: "",
    })

    const [funding, setFunding] = useRecoilState(fundingRegAtom)

    const fetchUser = async () => {
        try {
            const config = await frontEndAuthMiddleware({
                method: "get",
                url: "/user/me",
            })

            const response = await axiosInstance.request(config)
            setUserInfo(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.")
                } else {
                    window.alert("올바른 접근이 아닙니다.")
                }
            }
        }
    }

    useEffect(() => {
        fetchUser()
        setFunding((prev) => ({ ...prev, seller: userInfo._id }))
    }, [])

    const nextClick = () => {
        setFunding((prev) => ({ ...prev, seller: userInfo._id }))
        navigate("./title")
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>펀딩등록</styled.RegLabel>
            <styled.RegText>{userInfo.username}님 환영합니다.</styled.RegText>
            <styled.RegWrap>
                <styled.RegBtn onClick={nextClick}>시작하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegStart
