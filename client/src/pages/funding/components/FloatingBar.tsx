import * as styled from "../FundingPage.styles"
import { useNavigate } from "react-router-dom"
import { formatPrice, formatDate, formatPercentage } from "../../../utils/format.utils"
import { fundingProps, optionsProps } from "../../../interface/schema.interface"
import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../../../utils/axios.utils"

interface CategoryProps {
    _id: string
    categoryName: string
}

function FloatingBar({ funding }: { funding: fundingProps }) {
    const navigate = useNavigate()
    const [categories, setCategories] = useState({
        _id: "",
        categoryName: "",
    })

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/category/"+funding.categoryId)
            setCategories(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                window.alert("잘못된 접근입니다.")
            }
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <styled.FloatingWrap>
            <styled.FloatingSticky>
                <styled.FloatingNavWrap>
                    <styled.NavRightWrap>
                        <styled.NavRightBtn>펀딩</styled.NavRightBtn>
                    </styled.NavRightWrap>
                </styled.FloatingNavWrap>

                <styled.FloatingInfoWrap>
                    <styled.FundingCategory>{categories.categoryName}</styled.FundingCategory>
                    <styled.FundingTitle>{funding.title}</styled.FundingTitle>
                    <styled.FundingInfo>{funding.info}</styled.FundingInfo>
                    <styled.FundingDate>펀딩시작일 : {formatDate(funding.startDate)}</styled.FundingDate>
                    <styled.FundingDate>펀딩종료일 : {formatDate(funding.endDate)}</styled.FundingDate>
                    <styled.FundingAmountWrap>
                        <styled.FundingCurrent>{formatPrice(funding.currentAmount)}</styled.FundingCurrent>
                        <styled.FundingCurrentLabel>원 달성</styled.FundingCurrentLabel>
                        <styled.FundingPercent>
                            {formatPercentage(funding.currentAmount, funding.goalAmount)}% 달성
                        </styled.FundingPercent>
                    </styled.FundingAmountWrap>
                    <styled.BtnWrap>
                        <styled.LikeBtn>
                            <styled.LikeSvg
                                alt=""
                                src={require("../../../assets/svg/heart_icon.svg").default}
                            ></styled.LikeSvg>
                        </styled.LikeBtn>
                        <styled.FundingBtn onClick={() => navigate("/options", { state: { funding: funding } })}>
                            펀딩하기
                        </styled.FundingBtn>
                    </styled.BtnWrap>
                </styled.FloatingInfoWrap>
                <styled.OptionsWrap>
                    {funding.options.map((item, index) => (
                        <styled.OptWrap key={index}>
                            <styled.OptTop>
                                <styled.OptPrice>{formatPrice(item.price)}</styled.OptPrice>원
                                <styled.OptCurrentAmount>
                                    {item.totalAmount - item.currentAmount}개 남음
                                </styled.OptCurrentAmount>
                                <styled.OptTotalAmount>제한수량 {item.totalAmount}개</styled.OptTotalAmount>
                            </styled.OptTop>
                            <styled.OptMid>
                                <styled.OptTitle>{item.title}</styled.OptTitle>
                            </styled.OptMid>
                            <styled.OptMid></styled.OptMid>
                            <styled.OptInfo>{item.info}</styled.OptInfo>
                            <styled.OptBot>
                                <styled.DeliveryPrice>
                                    배송비 {formatPrice(funding.deliveryPrice)} 원
                                </styled.DeliveryPrice>
                                <styled.DeliveryDate>
                                    {formatDate(funding.deliveryDate)}부터 순차적으로 배송예정
                                </styled.DeliveryDate>
                            </styled.OptBot>
                        </styled.OptWrap>
                    ))}
                </styled.OptionsWrap>
            </styled.FloatingSticky>
        </styled.FloatingWrap>
    )
}

export default FloatingBar
