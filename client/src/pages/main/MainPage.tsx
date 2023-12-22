import React, { useEffect, useState } from "react"
import Slider from "react-slick" // 슬라이더 컴포넌트 임포트
import "slick-carousel/slick/slick.css" // 메인 슬라이드
import "slick-carousel/slick/slick-theme.css"
import "../main/Main.css"
import Product from "../../components/Product"
import { axiosInstance } from "../../utils/axios.utils"
import * as styeld from "./MainPage.styles"
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
    dots: true,
    infinite: true,
    slidesToShow: 3,
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
    category: string // 제조사
}

function MainPage() {
    // const [activeTab, setActiveTab] = useState("recommend");
    // const [recommendImages, setRecommendImages] = useState<ImageData[]>([]);
    // const [popularImages, setPopularImages] = useState<ImageData[]>([]);
    // const [fundingImages, setFundingImages] = useState<ImageData[]>([]);
    const [fundingsImages, setFundingsImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(true) // 로딩 상태 관리를 위한 상태

    // sudo npm install -g json-server
    // json-server --watch public/data/data.json

    // 이미지 데이터를 가져오는 함수
    // async function fetchImages(
    //   endpoint: string,
    //   setImages: React.Dispatch<React.SetStateAction<ImageData[]>>
    // ) {
    //   try {
    //     const response = await axiosInstance.get(`${endpoint}`);
    //     setImages(response.data);
    //   } catch (error) {
    //     console.error(`Fetching ${endpoint} images failed`, error);
    //   }
    // }
    // 펀딩 이미지 데이터를 가져오는 함수
    useEffect(() => {
        const fetchFundingsImages = async () => {
            try {
                const response = await axiosInstance.get(`/fundings`)
                console.log("response.data : ", response.data)
                setFundingsImages(response.data.data)
            } catch (error) {
                console.error("Fetching fundings images failed:", error)
            } finally {
                setLoading(false) // 데이터 로딩 완료 후 로딩 상태 업데이트
            }
        }
        fetchFundingsImages()
    }, [])
    // useEffect(() => {
    //   setActiveTab(activeTab); // 현재 활성화된 탭 설정
    // }, [activeTab]);

    // useEffect(() => {
    //   // 처음 컴포넌트 마운트 시 추천상품 이미지 데이터를 로드
    //   fetchImages("/recommend", setRecommendImages);
    // }, []);

    // 탭이 바뀔 때마다 해당 이미지 데이터를 로드
    // useEffect(() => {
    //   const loadData = async () => {
    //     if (activeTab === "recommend") {
    //       await fetchImages("recommend", setRecommendImages);
    //     } else if (activeTab === "popular") {
    //       await fetchImages("popular", setPopularImages);
    //     } else if (activeTab === "funding") {
    //       await fetchImages("funding", setFundingImages);
    //     }
    //   };
    //   loadData();
    // }, [activeTab]);

    // 탭 컨텐츠 렌더링 함수
    // function renderTabContent(images: ImageData[]) {
    //   return (
    //     <div className="flex flex-wrap -mx-2">
    //       {images.map((image) => (
    //         <Product
    //           key={image.id}
    //           id={image.id}
    //           url={image.url}
    //           alt={image.alt}
    //           description={image.description} // 설명 추가
    //           manufacturer={image.manufacturer} // 제조사 추가
    //         />
    //       ))}
    //     </div>
    //   );
    // }
    function renderFundingsSliderSection(images: ImageData[]) {
        return (
            <Slider {...EarlyBirdSliderSettings}>
                {images.map((image) => (
                    <Product
                        key={image._id}
                        id={image._id}
                        url={image.mainImageUrl}
                        alt={image.title}
                        description={image.title}
                        manufacturer={image.mainImageUrl}
                        isSlider={true}
                    />
                ))}
            </Slider>
        )
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
            {/* 다른 섹션들... */}

            {/* 컨텐츠 영역 */}
            {/* 좌측 섹션 */}
            <styeld.ContentArea>
                {/* 탭 메뉴 */}
                <styeld.Section>
                    {/* <styeld.TabButtonsContainer>
            <styeld.TabButton
              className={activeTab === "recommend" ? "bg-[#333333]" : ""}
              onClick={() => setActiveTab("recommend")}
            >
              추천상품
            </styeld.TabButton>

            <styeld.TabButton
              className={activeTab === "popular" ? "bg-[#333333]" : ""}
              onClick={() => setActiveTab("popular")}
            >
              인기상승
            </styeld.TabButton>

            <styeld.TabButton
              className={activeTab === "funding" ? "bg-[#333333]" : ""}
              onClick={() => setActiveTab("funding")}
            >
              펀딩랭킹
            </styeld.TabButton>
          </styeld.TabButtonsContainer> */}
                    {/* 탭 컨텐츠 */}
                    <styeld.TabContentContainer>
                        {/* 추천상품, 인기상승, 펀딩랭킹 탭 컨텐츠 */}
                        {/* {activeTab === "recommend" && renderTabContent(recommendImages)}
            {activeTab === "popular" && renderTabContent(popularImages)}
            {activeTab === "funding" && renderTabContent(fundingImages)} */}
                    </styeld.TabContentContainer>
                </styeld.Section>

                {/* 우측 섹션 - sticky 위치 지정 */}
                <styeld.StickySection>
                    <styeld.RealTimeRankingTitle>실시간 랭킹</styeld.RealTimeRankingTitle>
                    <styeld.RealTimeRankingList>
                        <li className="mb-1">강동훈</li>
                        <li className="mb-1">김도희</li>
                        <li className="mb-1">류충현</li>
                        <li className="mb-1">위동현</li>
                        <li className="mb-1">윤상원</li>
                        <li className="mb-1">최윤혁</li>
                        {/* 추가 랭킹 아이템들 */}
                    </styeld.RealTimeRankingList>
                </styeld.StickySection>
            </styeld.ContentArea>

            <styeld.EarlyBirdTitle>얼리버드</styeld.EarlyBirdTitle>
            <styeld.FullWidthSliderContainer>
                {/* 새로운 슬라이더 섹션 추가 */}
                <styeld.TabContentContainer>
                    {renderFundingsSliderSection(fundingsImages)} {/* 예시로 recommendImages를 사용 */}
                </styeld.TabContentContainer>
            </styeld.FullWidthSliderContainer>

            <styeld.EarlyBirdTitle>트렌드</styeld.EarlyBirdTitle>
            <styeld.FullWidthSliderContainer>
                {/* 새로운 슬라이더 섹션 추가 */}
                <styeld.TabContentContainer>
                    {renderFundingsSliderSection(fundingsImages)} {/* 예시로 recommendImages를 사용 */}
                </styeld.TabContentContainer>
            </styeld.FullWidthSliderContainer>
        </styeld.MainPageContainer>
    )
}

export default MainPage
