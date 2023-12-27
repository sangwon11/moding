import { useLocation, useNavigate } from "react-router-dom"
import * as styled from "./PaymentPage.styles"
import Payment from "../../components/portone/Pay"
import { useState, useEffect } from "react"
import { optionsProps } from "../../interface/schema.interface"
import { frontEndAuthMiddleware } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { formatPrice } from "../../utils/format.utils"

interface OrderMethodProps {
    label: string
    pg: string
}

function PaymentPage() {
    const navigate = useNavigate()
    const state = useLocation().state
    const funding = state.funding
    const optionSelect = state.optionSelect
    const supPrice = state.supPrice
    const selectedOptions = funding.options.filter((item: optionsProps) => optionSelect.includes(item._id))

    const [userInfo, setUserInfo] = useState({
        _id: "",
        email: "",
        username: "",
        phoneNumber: "",
        postCode: "",
        address: "",
        addressDetail: "",
    })

    const [order, setOrder] = useState({
        userId: "asd",
        orderedBy: "asd",
        postCode: "asd",
        address: "asd",
        addressDetail: "asd",
        phoneNumber: "asd",
        fundingId: funding._id,
        orderList: optionSelect,
        donation: supPrice,
        nameOpen: true,
        priceOpen: true,
        orderStatus: "주문완료",
    })

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const sanitizedValue =
            name === "phoneNumber" ? value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : value
        setOrder({...order,[name]: sanitizedValue,})
    }

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

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (userInfo._id.length === 0) {
            fetchUser()
        }
        const sumTotalPrice =
            selectedOptions.reduce((acc: number, item: optionsProps) => acc + Number(item.price), 0) +
            Number(supPrice) +
            Number(funding.deliveryPrice)

        setTotalPrice(sumTotalPrice)
    }, [])

    const [orderIndex, setOrderIndex] = useState<number>(0)
    const [orderPg, setOrderPg] = useState<string>("tosspay")

    const checkOrderIndex = (index: number, pg: string) => {
        setOrderIndex(index)
        setOrderPg(pg)
    }

    const orderMethod = [
        { label: "토스페이", pg: "tosspay" },
        { label: "카카오페이", pg: "kakaopay" },
        { label: "토스페이먼츠", pg: "tosspayments" },
        { label: "카드결제", pg: "html5_inicis" },
    ]

    const paymentData = {
        pg: orderPg, // PG사
        pay_method: "card", // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: totalPrice, // 결제금액
        name: funding.title, // 주문명
        buyer_name: "홍길동", // 구매자 이름
        buyer_tel: "01012341234", // 구매자 전화번호
        buyer_email: "example@example", // 구매자 이메일
        buyer_addr: "신사동 661-16", // 구매자 주소
        buyer_postcode: "06018", // 구매자 우편번호
    }

    const insertData = async () => {
        try {
          const response = await axiosInstance.post("/orders", order);
          if (response.status === 201) {
            window.alert("성공적으로 결제되었습니다.");
          } else {
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 409) {
              window.alert("결제에 실패하였습니다.");
            } else {
            }
          }
        }
      };

    const nextClick = () => {
        console.log(order)
        insertData()
    }

    return (
        <styled.Container>
            <styled.ContentsWrap>
                <styled.PriceWrap>
                    {selectedOptions.map((item: optionsProps, index: number) => (
                        <styled.OptionWrap key={index}>
                            <styled.OptionTitle>{item.title}</styled.OptionTitle>
                            <styled.OptionInfo>{item.info}</styled.OptionInfo>
                            <styled.OptionPrice>{formatPrice(item.price)}원</styled.OptionPrice>
                        </styled.OptionWrap>
                    ))}
                    <styled.SupPriceWrap>
                        <styled.SupPrice>{formatPrice(supPrice)}원</styled.SupPrice>
                    </styled.SupPriceWrap>
                    <styled.DeliveryPriceWrap>
                        <styled.DeliveryPrice>{formatPrice(funding.deliveryPrice)}원</styled.DeliveryPrice>
                    </styled.DeliveryPriceWrap>
                    <styled.TotalPriceWrap>
                        <styled.TotalPriceTag>총 결제금액</styled.TotalPriceTag>
                        <styled.TotalPrice>{formatPrice(totalPrice)}원</styled.TotalPrice>
                    </styled.TotalPriceWrap>
                </styled.PriceWrap>

                <styled.MeWrap>
                    <styled.MeLabel>주문자정보</styled.MeLabel>
                    <styled.InputWrap>
                        <styled.Input value={userInfo.email} onChange={onChangeInput} disabled />
                        <styled.Input
                            value={order.orderedBy}
                            onChange={onChangeInput}
                            name="orderedBy"
                        />
                        <styled.Input
                            value={order.phoneNumber}
                            onChange={onChangeInput}
                            name="phoneNumber"
                            maxLength={13}
                        />
                        <styled.Input value={order.postCode} onChange={onChangeInput} name="postCode"></styled.Input>
                        <styled.Input value={order.address} onChange={onChangeInput} name="address"></styled.Input>
                        <styled.Input
                            value={order.addressDetail}
                            onChange={onChangeInput}
                            name="addressDetail"
                        ></styled.Input>
                    </styled.InputWrap>
                </styled.MeWrap>

                <styled.OrderWrap>
                    {orderMethod.map((item: OrderMethodProps, index: number) => (
                        <styled.OrderMethodWrap key={index}>
                            <styled.OrderCheckBox
                                type="checkbox"
                                checked={orderIndex === index}
                                onChange={() => checkOrderIndex(index, item.pg)}
                            ></styled.OrderCheckBox>
                            <styled.OrderMethodLabel>{item.label}</styled.OrderMethodLabel>
                        </styled.OrderMethodWrap>
                    ))}
                </styled.OrderWrap>
                <styled.NextWrap>
                    <Payment data={paymentData}></Payment>
                    <styled.NextBtn onClick={nextClick}>결제하기</styled.NextBtn>
                </styled.NextWrap>
            </styled.ContentsWrap>
        </styled.Container>
    )
}

export default PaymentPage
