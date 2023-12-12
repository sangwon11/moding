import React, { useState } from "react";
import Slider from "react-slick"; // 슬라이더 컴포넌트 임포트

// 슬라이더 설정
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("recommend");

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
              className={`border p-2 ${
                activeTab === "recommend" ? "bg-gray-700" : ""
              }`}
            >
              추천상품
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`border p-2 ${
                activeTab === "popular" ? "bg-gray-700" : ""
              }`}
            >
              인기상승
            </button>
            <button
              onClick={() => setActiveTab("funding")}
              className={`border p-2 ${
                activeTab === "funding" ? "bg-gray-700" : ""
              }`}
            >
              펀딩랭킹
            </button>
          </div>
          {/* 탭 컨텐츠 */}
          <div className="border p-4 rounded">
            {/* 추천상품 탭 컨텐츠 */}
            {activeTab === "recommend" && (
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 1"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 2"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 3"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 4"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 5"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 6"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 7"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 8"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 9"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 10"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 11"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/computer.jpg"
                    alt="추천상품 12"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* 추가 이미지들... */}
              </div>
            )}
            {/* 인기상품 탭 컨텐츠 */}
            {activeTab === "popular" && (
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/all.jpg"
                    alt="인기상승 1"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/all.jpg"
                    alt="인기상승 2"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/all.jpg"
                    alt="인기상승 3"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* 인기상품 이미지들 */}
              </div>
            )}

            {/* 펀딩랭킹 탭 컨텐츠 */}
            {activeTab === "funding" && (
              <div className="flex flex-wrap -mx-2">
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/console.jpg"
                    alt="펀딩랭킹 1"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/console.jpg"
                    alt="펀딩랭킹 2"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/3 px-2 mb-4">
                  <img
                    src="/images/console.jpg"
                    alt="펀딩랭킹 3"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* 펀딩랭킹 이미지들 */}
              </div>
            )}
          </div>
        </div>

        {/* 우측 섹션 - sticky 위치 지정 */}
        <div className="sticky top-10 w-1/4 mr-4 p-4 space-y-4 border p-10 rounded mt-[74px]">
          <h2 className="text-lg font-bold mb-2">신상품 랭킹</h2>
          <ul className="list-decimal pl-4">
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
