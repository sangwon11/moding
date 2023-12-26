import React, { useEffect, useState } from "react"
import Slider from "react-slick" // 슬라이더 컴포넌트 임포트
import "slick-carousel/slick/slick.css" // 메인 슬라이드
import "slick-carousel/slick/slick-theme.css"
import "../main/Main.css"
import Product from "../../components/Product"
import { axiosInstance } from "../../utils/axios.utils"
import * as styeld from "./Category.styles"

// 메인 슬라이더 설정
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 680,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
}
// 얼리버드 슬라이더 설정
const EarlyBirdSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    variableWidth: false, // 이 부분을 false로 설정
}
interface ImageData {
    _id: string
    url: string
    mainImageUrl: string
    title: string
    description: string // 상품 설명
    categoryId: string // 제조사
    currentAmount: number
    goalAmount: number
}
interface CategoryData {
    _id: string
    categoryName: string
}

function Category() {
    const [fundingsImages, setFundingsImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(true) // 로딩 상태 관리를 위한 상태

    const [categories, setCategories] = useState<CategoryData[]>([])
    const [activeCategory, setActiveCategory] = useState("")

    const [allImages, setAllImages] = useState<ImageData[]>([]) // 전체 이미지 데이터를 저장

    // 전체 카테고리 목록 데이터를 가져오는 함수
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get(`/category`)
                console.log("API Response:", response.data)
                setCategories(response.data.data)
            } catch (error) {
                console.error("Fetching categories failed:", error)
            }
        }
        fetchCategories()
    }, [])

    // 전체 펀딩 이미지 데이터를 가져오는 함수
    const fetchFundingsImages = async () => {
        try {
            const response = await axiosInstance.get(`/fundings`)
            console.log("response.data : ", response.data)
            setFundingsImages(response.data.data)
            setAllImages(response.data.data) // 전체 이미지 데이터를 allImages에 저장
        } catch (error) {
            console.error("Fetching fundings images failed:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchFundingsImages()
    }, [])

    const fetchCategoryImages = async (categoryId: string) => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/fundings/category/${categoryId}`)
            setFundingsImages(response.data)
        } catch (error) {
            console.error("Fetching category images failed:", error)
        } finally {
            setLoading(false)
        }
    }
    const handleCategoryClick = (categoryId: string) => {
        console.log(`Selected categoryId: ${categoryId}`)

        setActiveCategory(categoryId)
        if (categoryId) {
            fetchCategoryImages(categoryId)
        } else {
            fetchFundingsImages() // categoryId가 없으면 전체 상품을 불러옵니다.
        }
    }
    // 슬라이더 이미지 함수
    function renderFundingsSliderSection(images: ImageData[]) {
        if (!Array.isArray(images)) {
            return null // images가 배열이 아니면 아무것도 렌더링하지 않음
        }
        return (
            <Slider {...EarlyBirdSliderSettings}>
                {images.map((image) => (
                    <Product
                        key={image._id}
                        id={image._id}
                        url={image.mainImageUrl}
                        alt={image.title}
                        description={image.title}
                        isSlider={true}
                        currentAmount={image.currentAmount}
                        goalAmount={image.goalAmount}
                    />
                ))}
            </Slider>
        )
    }
    // 메인 이미지 함수
    function renderFundingsMainSection(images: ImageData[]) {
        if (loading) {
            return <div className="text-white">Loading...</div>
        }
        if (!images.length) {
            return <div className="text-white">데이터가 없습니다.</div>
        }
        return (
            <div className="flex flex-wrap -mx-2 justify-start">
                {images.map((image) => (
                    <div key={image._id} className="w-1/4 px-2 mb-4">
                        <Product
                            id={image._id}
                            url={image.mainImageUrl}
                            alt={image.title}
                            description={image.title}
                            isSlider={true}
                            currentAmount={image.currentAmount}
                            goalAmount={image.goalAmount}
                        />
                    </div>
                ))}
            </div>
        )
    }

    // 우측 섹션 함수
    function renderFundingsRightSection(images: ImageData[]) {
        // 로딩 상태와 데이터 유무를 체크하여 메시지를 표시
        if (loading) {
            return <div className="text-white">Loading...</div>
        }
        if (!allImages.length) {
            return <div className="text-white">데이터가 없습니다.</div>
        }

        // 상위 5개의 이미지만 렌더링
        const topImages = allImages.slice(0, 5)

        return (
            <div className="flex flex-col">
                {topImages.map((image, index) => (
                    <div key={image._id} className="flex items-center mb-2">
                        <div className="text-white font-bold mr-2">{index + 1}.</div>
                        <Product
                            id={image._id}
                            url={image.mainImageUrl}
                            alt={image.title}
                            description={image.title}
                            isRightSection={true}
                        />
                    </div>
                ))}
            </div>
        )
    }

    // 얼리버드 섹션을 렌더링하는 함수
    function renderEarlyBirdSection(images: ImageData[]) {
        const earlyBirdImages = allImages.slice(0, 4)
        return renderFundingsSliderSection(earlyBirdImages)
    }
    // 트렌드 섹션을 렌더링하는 함수
    function renderTrendSection(images: ImageData[]) {
        const trendImages = [...allImages].reverse().slice(0, 4)
        return renderFundingsSliderSection(trendImages)
    }

    // 새로고침 시 로딩 화면
    if (loading) {
        return <div className="text-white">Loading...</div>
    }

    return (
        <styeld.MainPageContainer>
            {/* 슬라이드 광고 섹션 */}
            <Slider {...sliderSettings}>
                <div className="slider-container h-[300px] overflow-hidden">
                    <img src="/img/computer.jpg" alt="광고 이미지 1" className="w-full h-full object-cover" />
                </div>
                <div className="slider-container h-[300px] overflow-hidden">
                    <img src="/img/all.jpg" alt="광고 이미지 1" className="w-full h-full object-cover" />
                </div>
                <div className="slider-container h-[300px] overflow-hidden">
                    <img src="/img/console.jpg" alt="광고 이미지 1" className="w-full h-full object-cover" />
                </div>
                <div className="slider-container h-[300px] overflow-hidden">
                    <img src="/img/computer.jpg" alt="광고 이미지 1" className="w-full h-full object-cover" />
                </div>
                {/* 추가 슬라이드 이미지들... */}
            </Slider>
            <styeld.ContentArea>
                {/* 탭 메뉴 */}
                <styeld.Section>
                    <styeld.TabButtonsContainer>
                        <styeld.TabButton
                            className={!activeCategory ? "active" : ""}
                            onClick={() => handleCategoryClick("")}
                        >
                            전체상품
                        </styeld.TabButton>
                        {categories.map((category) => (
                            <styeld.TabButton
                                key={category._id}
                                className={activeCategory === category._id ? "active" : ""}
                                onClick={() => handleCategoryClick(category._id)}
                            >
                                {category.categoryName}
                            </styeld.TabButton>
                        ))}
                    </styeld.TabButtonsContainer>
                    {/* 탭 컨텐츠 */}
                    <styeld.TabContentContainer>{renderFundingsMainSection(fundingsImages)}</styeld.TabContentContainer>
                </styeld.Section>

                {/* 우측 섹션 - sticky 위치 지정 */}
                <styeld.StickySection>
                    <styeld.RealTimeRankingTitle>실시간 랭킹</styeld.RealTimeRankingTitle>
                    <styeld.RealTimeRankingList>{renderFundingsRightSection(allImages)}</styeld.RealTimeRankingList>
                </styeld.StickySection>
            </styeld.ContentArea>

            <styeld.EarlyBirdTitle>얼리버드</styeld.EarlyBirdTitle>
            <styeld.FullWidthSliderContainer>
                <styeld.TabContentContainer>{renderEarlyBirdSection(allImages)}</styeld.TabContentContainer>
            </styeld.FullWidthSliderContainer>

            <styeld.EarlyBirdTitle>트렌드</styeld.EarlyBirdTitle>
            <styeld.FullWidthSliderContainer>
                <styeld.TabContentContainer>{renderTrendSection(allImages)}</styeld.TabContentContainer>
            </styeld.FullWidthSliderContainer>
        </styeld.MainPageContainer>
    )
}

export default Category
