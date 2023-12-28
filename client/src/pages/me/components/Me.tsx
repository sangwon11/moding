import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../../../utils/axios.utils"
import { frontEndAuthMiddleware } from "../../../utils/jwtUtils"
import * as styled from "../MyPage.styles"

function Me() {
    
    const [userInfo, setUserInfo] = useState({
        _id: "",
        email: "",
        username: "",
        phoneNumber: "",
        postCode: "",
        address: "",
        adressDetail: "",
    })

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
    }, [])

    return (
        <styled.MeWrap>
            <styled.PageLabel>마이페이지</styled.PageLabel>
            <styled.InputWrap>
                <styled.Input value={userInfo.username} disabled></styled.Input>
                <styled.Input value={userInfo.email} disabled></styled.Input>
                <styled.Input value={userInfo.phoneNumber} disabled></styled.Input>
                <styled.Input value={userInfo.postCode} disabled></styled.Input>
                <styled.Input value={userInfo.address} disabled></styled.Input>
                <styled.Input value={userInfo.adressDetail} disabled></styled.Input>
            </styled.InputWrap>
        </styled.MeWrap>
    )
}

export default Me
