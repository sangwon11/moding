import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../../../utils/axios.utils"
import { frontEndAuthMiddleware } from "../../../utils/jwtUtils"
import * as styled from "../MyPage.styles"

function Order() {
    const userInfo = useLocation().state.userInfo

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
            console.log(response.data.data)
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

    const fetchProduct = async () => {
        try {
            const config = await frontEndAuthMiddleware({
                method: "get",
                url: "/orders/" + userInfo._id,
            })

            const response = await axiosInstance.request(config)
            setOrderList(response.data.data)
            console.log(response.data.data)
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
        fetchOrder()
    }, [])

    return (
        <styled.OrdersWrap>
            <styled.PageLabel>구매목록</styled.PageLabel>
            {orderList.map((item, index) => (
                <styled.OrderWrap key={index}>
                    <styled.OrderNumber>
                        주문날짜:{item.updatedAt.slice(0, 10)} 
                        {item.updatedAt.slice(11, 16)}
                    </styled.OrderNumber>
                    <styled.OrderNumber>주문번호:{item.orderNumber}</styled.OrderNumber>
                </styled.OrderWrap>
            ))}
        </styled.OrdersWrap>
    )
}

export default Order
