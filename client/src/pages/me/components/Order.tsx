import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../../../utils/axios.utils"
import { frontEndAuthMiddleware } from "../../../utils/jwtUtils"
import * as styled from "../MyPage.styles"
import OrderList from "./OrderList"
import Loading from "../../../components/loading/Loading"

function Order() {
    const navigate = useNavigate()
    const userInfo = useLocation().state.userInfo
    const [loading, setLoading] = useState(true)

    const [orderList, setOrderList] = useState([
        {
            orderedBy: "",
            phoneNumber: "",
            postCode: "",
            address: "",
            addressDetail: "",
            fundingId: "",
            orderList: [
                {
                    optionId: "",
                    amount: "",
                },
            ],
            orderNumber: "",
            orderStatus: "",
            paymentMethod: "",
            donation: "",
            priceOpen: true,
            nameOpen: true,
            updatedAt: "",
        },
    ])

    const fetchOrder = async () => {
        try {
            const config = await frontEndAuthMiddleware({
                method: "get",
                url: "/orders/" + userInfo._id,
            })

            const response = await axiosInstance.request(config)
            setOrderList(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("올바른 접근이 아닙니다.")
                    navigate("/404")
                } else {
                    window.alert("올바른 접근이 아닙니다.")
                }
            }
        }   finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <styled.OrdersWrap>
            <styled.PageLabel>구매목록</styled.PageLabel>
            <styled.TagWrap>
                <styled.Tag200>주문일자</styled.Tag200>
                <styled.Tag250>상품정보</styled.Tag250>
                <styled.Tag200>주문번호</styled.Tag200>
                <styled.Tag100>배송시작</styled.Tag100>
            </styled.TagWrap>
            {orderList
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .map((item, index) => {
                    return <OrderList {...item} />
                })}
        </styled.OrdersWrap>
    )
}

export default Order
