import { useNavigate } from "react-router-dom"
import * as styled from "./MyPageNav.styles"
import { frontEndAuthMiddleware } from "../../../../utils/jwtUtils"
import { axios, axiosInstance } from "../../../../utils/axios.utils"
import { useEffect, useState } from "react"

function MyPageNav() {
    const navigate = useNavigate()

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
        <styled.NavWrap>
            <styled.NavBtn onClick={()=>navigate("")}>마이페이지</styled.NavBtn>
            <styled.NavBtn onClick={()=>navigate("./order", { state: { userInfo: userInfo } })}>구매목록</styled.NavBtn>
            <styled.NavBtn onClick={()=>navigate("./seller")}>샐러등록</styled.NavBtn>
        </styled.NavWrap>
    )
}

export default MyPageNav
