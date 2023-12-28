import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../../../utils/axios.utils"
import { frontEndAuthMiddleware } from "../../../utils/jwtUtils"
import * as styled from "../MyPage.styles"

interface OrderProps {
    orderedBy: string
    phoneNumber: string
    postCode: string
    address: string
    addressDetail: string
    fundingId: string
    orderList: {
        optionId: string
        amount: string
    }[]
    orderNumber: string
    orderStatus: string
    paymentMethod: string
    donation: string
    priceOpen: boolean
    nameOpen: boolean
    updatedAt: string
}

function OrderList(props: OrderProps) {
    const order = props

    const [funding, setFunding] = useState({
        title: "",
        mainImageUrl: "",
        info: "",
        deliveryDate: "",
        options: [
            {
                title: "",
                price: "",
            },
        ],
    })

    const fetchFunding = async () => {
        try {
            const config = await frontEndAuthMiddleware({
                method: "get",
                url: "/fundings/" + order.fundingId,
            })

            const response = await axiosInstance.request(config)
            setFunding(response.data)
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
        fetchFunding()
    }, [])

    return (
        <styled.OrderWrap>
            <styled.Wrap>
                <styled.OrderDate>{order.updatedAt.slice(0, 10)}</styled.OrderDate>
                <styled.ImgWrap>
                    <styled.Img src={funding.mainImageUrl}></styled.Img>
                </styled.ImgWrap>
            </styled.Wrap>
            <styled.TitleWrap>
                <styled.Title>{funding.title}</styled.Title>
            </styled.TitleWrap>
            <styled.Wrap>
                <styled.OrderNumber>{order.orderNumber}</styled.OrderNumber>
            </styled.Wrap>
            <styled.Wrap>
                <styled.Text>{funding.deliveryDate}</styled.Text>
            </styled.Wrap>
        </styled.OrderWrap>
    )
}

export default OrderList
