import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // 슬라이더 컴포넌트 임포트
import "../main/Main.css";
// 슬라이더 설정
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 680,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
interface ImageData {
  id: number;
  url: string;
  alt: string;
}

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("recommend");
  const [recommendImages, setRecommendImages] = useState<ImageData[]>([]);
  const [popularImages, setPopularImages] = useState<ImageData[]>([]);
  const [fundingImages, setFundingImages] = useState<ImageData[]>([]);

  // sudo npm install -g json-server
  // json-server --watch public/data/data.json

  // 이미지 데이터를 가져오는 함수
  const fetchImages = (
    endpoint: string,
    setImages: React.Dispatch<React.SetStateAction<ImageData[]>>
  ): void => {
    fetch(`http://localhost:3000/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) =>
        console.error(`Fetching ${endpoint} images failed`, error)
      );
  };

  useEffect(() => {
    setActiveTab(activeTab); // 현재 활성화된 탭 설정
  }, [activeTab]);

  useEffect(() => {
    // 처음 컴포넌트 마운트 시 추천상품 이미지 데이터를 로드
    fetchImages("recommend", setRecommendImages);
  }, []);

  useEffect(() => {
    // 탭이 바뀔 때마다 해당 이미지 데이터를 로드
    if (activeTab === "recommend") {
      fetchImages("recommend", setRecommendImages);
    } else if (activeTab === "popular") {
      fetchImages("popular", setPopularImages);
    } else if (activeTab === "funding") {
      fetchImages("funding", setFundingImages);
    }
  }, [activeTab]);

  // 탭 컨텐츠 렌더링 함수
  // index 제거함 (초안)
  const renderTabContent = (images: ImageData[]) => (
    <div className="flex flex-wrap -mx-2">
      {images.map((image) => (
        <div key={image.id} className="w-1/3 px-2 mb-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
            <img
              src={image.url}
              alt={image.alt}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
  //   useEffect(() => {
  //     // 가짜 이미지 데이터
  //     const fakeRecommendData = [
  //       { src: "/images/computer.jpg", alt: "추천상품 1" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       // 여기에 추가 이미지 데이터를 넣을 수 있습니다.
  //     ];
  //     const fakePopularData = [
  //       { src: "/images/all.jpg", alt: "인기상승 1" },
  //       { src: "/images/all.jpg", alt: "인기상승 2" },
  //       { src: "/images/all.jpg", alt: "인기상승 2" },
  //       { src: "/images/computer.jpg", alt: "추천상품 2" },
  //       { src: "/images/all.jpg", alt: "인기상승 2" },
  //       // ... 추가 인기상승 이미지 데이터
  //     ];

  //     const fakeFundingData = [
  //       { src: "/images/console.jpg", alt: "펀딩랭킹 1" },
  //       { src: "/images/console.jpg", alt: "펀딩랭킹 2" },
  //       { src: "/images/console.jpg", alt: "펀딩랭킹 1" },
  //       { src: "/images/console.jpg", alt: "펀딩랭킹 2" },

  //       // ... 추가 펀딩랭킹 이미지 데이터
  //     ];

  //     // 이미지 데이터를 상태에 설정
  //     setRecommendImages(fakeRecommendData);
  //     setPopularImages(fakePopularData);
  //     setFundingImages(fakeFundingData);
  //   }, []);

  return (
    <div className="main-page">
      {/* 슬라이드 광고 섹션 */}
      <Slider {...sliderSettings}>
        <div className="slider-container h-[300px] overflow-hidden">
          <img
            src="/images/computer.jpg"
            alt="광고 이미지 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="slider-container h-[300px] overflow-hidden">
          <img
            src="/images/all.jpg"
            alt="광고 이미지 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="slider-container h-[300px] overflow-hidden">
          <img
            src="/images/console.jpg"
            alt="광고 이미지 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="slider-container h-[300px] overflow-hidden">
          <img
            src="/images/computer.jpg"
            alt="광고 이미지 1"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 추가 슬라이드 이미지들... */}
      </Slider>
      {/* 다른 섹션들... */}

      {/* 컨텐츠 영역 */}
      <div className="relative mt-10 flex justify-between items-start">
        {/* 좌측 섹션 */}
        <div className="w-3/4 p-4 space-y-4">
          {/* 탭 메뉴 */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab("recommend")}
              className={`text-white bg-[#D9D9D9]/[.1] border-none p-2 rounded-3xl ${
                activeTab === "recommend" ? "bg-[#333333]" : ""
              }`}
            >
              추천상품
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`text-white bg-[#D9D9D9]/[.1] border-none p-2 rounded-3xl ${
                activeTab === "popular" ? "bg-[#333333]" : ""
              }`}
            >
              인기상승
            </button>
            <button
              onClick={() => setActiveTab("funding")}
              className={`text-white bg-[#D9D9D9]/[.1] border-none p-2 rounded-3xl ${
                activeTab === "funding" ? "bg-[#333333]" : ""
              }`}
            >
              펀딩랭킹
            </button>
          </div>
          {/* 탭 컨텐츠 */}
          <div className="p-4 rounded bg-[#D9D9D9]/[.1]">
            {/* 추천상품 탭 컨텐츠 */}
            {activeTab === "recommend" && renderTabContent(recommendImages)}
            {activeTab === "popular" && renderTabContent(popularImages)}
            {activeTab === "funding" && renderTabContent(fundingImages)}
            {/* {activeTab === "recommend" && (
              <div className="flex flex-wrap -mx-2">
                {recommendImages.map((image, index) => (
                  <div key={index} className="w-1/3 px-2 mb-4">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )} */}
            {/* 추가 이미지들... */}

            {/* 인기상승 탭 컨텐츠 */}
            {/* {activeTab === "popular" && (
              <div className="flex flex-wrap -mx-2">
                {popularImages.map((image, index) => (
                  <div key={index} className="w-1/3 px-2 mb-4">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )} */}
            {/* 펀딩랭킹 탭 컨텐츠 */}
            {/* {activeTab === "funding" && (
              <div className="flex flex-wrap -mx-2">
                {fundingImages.map((image, index) => (
                  <div key={index} className="w-1/3 px-2 mb-4">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        </div>

        {/* 우측 섹션 - sticky 위치 지정 */}
        {/* </div><div className="sticky top-10 w-1/4 mr-4 p-4 space-y-4 border p-10 rounded "> */}
        <div className="sticky top-10 w-1/4 mr-4 p-4 space-y-4 rounded bg-[#D9D9D9]/[.1] mt-[72.5px]">
          <h2 className="text-lg font-bold mb-2 text-white">신상품 랭킹</h2>
          <ul className="list-decimal pl-4 text-white">
            <li className="mb-1">강동훈</li>
            <li className="mb-1">김도희</li>
            <li className="mb-1">류충현</li>
            <li className="mb-1">위동현</li>
            <li className="mb-1">윤상원</li>
            <li className="mb-1">최윤혁</li>
            {/* 추가 랭킹 아이템들 */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
