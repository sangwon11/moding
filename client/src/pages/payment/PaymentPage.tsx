import { useLocation, useNavigate } from "react-router-dom"
import * as styled from "./PaymentPage.styles"
import Payment from "../../components/portone/Pay"
import { useState, useEffect } from "react"
import { optionsProps } from "../../interface/schema.interface"
import { frontEndAuthMiddleware } from "../../utils/jwtUtils"
import { axios, axiosInstance } from "../../utils/axios.utils"
import { formatPrice } from "../../utils/format.utils"
import Loading from "../../components/loading/Loading"

interface OrderMethodProps {
    label: string
    pg: string
}

function PaymentPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const state = useLocation().state
    const funding = state.funding
    const optionSelect = state.optionSelect
    const supPrice = state.supPrice
    const selectedOptions = funding.options.filter((item: optionsProps) => optionSelect.includes(item._id))

    const mappedOptions = optionSelect.map((optionId: string) => ({
        optionId,
        amount: 1
    }));

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
        userId: userInfo._id,
        orderedBy: "",
        postCode: "",
        address: "",
        addressDetail: "",
        phoneNumber: "",
        fundingId: funding._id,
        orderList: mappedOptions,
        donation: supPrice,
        nameOpen: true,
        priceOpen: true,
        paymentMethod: "카드",
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
                    navigate("/")
                } else {
                    window.alert("올바른 접근이 아닙니다.")
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo._id.length === 0) {
            fetchUser()
        }
        const sumTotalPrice =
            selectedOptions.reduce((acc: number, item: optionsProps) => acc + Number(item.price), 0) +
            Number(supPrice) +
            Number(funding.deliveryPrice)

        setTotalPrice(sumTotalPrice)
        setOrder(prevOrder => ({
            ...prevOrder,
            userId: userInfo._id,
            orderedBy: userInfo.username,
            postCode: userInfo.postCode,
            address: userInfo.address,
            addressDetail: userInfo.addressDetail,
            phoneNumber: userInfo.phoneNumber,
        }));
    }, [userInfo])

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
            const config = await frontEndAuthMiddleware({
                method: "post",
                url: "/orders",
                data: order
            })

            const response = await axiosInstance.request(config)
            if (response.status === 201) {
                window.alert("성공적으로 결제되었습니다.")
                navigate("/")
            } else {
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    window.alert("결제에 실패하였습니다.")
                } else {
                    window.alert("결제에 실패하였습니다.")
                }
            }
        }
    }

    const isOrderValid = (order: any) => {
        for (const key in order) {
            if (order.hasOwnProperty(key)) {
                if (order[key] === "" || order[key] === null || order[key] === undefined) {
                    return false;
                }
            }
        }
        return true;
    };
    
    const nextClick = () => {
        if (!isOrderValid(order)) {
            window.alert("모든 값을 입력해주세요.")
        } else {
            insertData()
        }
    }

    if (loading) {
        return <Loading />
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
                        <styled.SupPrice>후원비용</styled.SupPrice>
                        <styled.SupPrice>{formatPrice(supPrice)}원</styled.SupPrice>
                    </styled.SupPriceWrap>
                    <styled.DeliveryPriceWrap>
                        <styled.DeliveryPrice>배송비</styled.DeliveryPrice>
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
                    <styled.NextBtn onClick={nextClick} disabled={!isOrderValid(order)}>결제하기</styled.NextBtn>
                </styled.NextWrap>
            </styled.ContentsWrap>
        </styled.Container>
    )
}

export default PaymentPage
