import React, { useEffect, useState } from "react";
import Slider from "react-slick"; // 슬라이더 컴포넌트 임포트
import axios from "axios";
import "slick-carousel/slick/slick.css"; // 메인 슬라이드
import "slick-carousel/slick/slick-theme.css";
import "../main/Main.css";
import Product from "../../components/Product";
import tw from "tailwind-styled-components"

// 슬라이더 설정
const Container = tw.div`w-[1440px] h-[1375px] relative bg-gray-950`;

const AbsoluteBox = tw.div`absolute bg-zinc-300 bg-opacity-10 rounded-[30px]`;

const Banner = tw.div`absolute text-center flex justify-center text-white text-[25px] font-bold font-['Kantumruy']`;

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
  description: string; // 상품 설명
  manufacturer: string; // 제조사
}

function MainPage() {
  const [activeTab, setActiveTab] = useState("recommend");
  const [recommendImages, setRecommendImages] = useState<ImageData[]>([]);
  const [popularImages, setPopularImages] = useState<ImageData[]>([]);
  const [fundingImages, setFundingImages] = useState<ImageData[]>([]);

  // sudo npm install -g json-server
  // json-server --watch public/data/data.json

  // 이미지 데이터를 가져오는 함수
  async function fetchImages(
    endpoint: string,
    setImages: React.Dispatch<React.SetStateAction<ImageData[]>>
  ) {
    try {
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      setImages(response.data);
    } catch (error) {
      console.error(`Fetching ${endpoint} images failed`, error);
    }
  }

  useEffect(() => {
    setActiveTab(activeTab); // 현재 활성화된 탭 설정
  }, [activeTab]);

  useEffect(() => {
    // 처음 컴포넌트 마운트 시 추천상품 이미지 데이터를 로드
    fetchImages("recommend", setRecommendImages);
  }, []);

  // 탭이 바뀔 때마다 해당 이미지 데이터를 로드
  useEffect(() => {
    const loadData = async () => {
      if (activeTab === "recommend") {
        await fetchImages("recommend", setRecommendImages);
      } else if (activeTab === "popular") {
        await fetchImages("popular", setPopularImages);
      } else if (activeTab === "funding") {
        await fetchImages("funding", setFundingImages);
      }
    };
    loadData();
  }, [activeTab]);
};
  // 탭 컨텐츠 렌더링 함수
  function renderTabContent(images: ImageData[]) {
    return (
      <div className="flex flex-wrap -mx-2">
        {images.map((image) => (
          <Product
            key={image.id}
            id={image.id}
            url={image.url}
            alt={image.alt}
            description={image.description} // 설명 추가
            manufacturer={image.manufacturer} // 제조사 추가
          />
        ))}
      </div>
    );
  }

  

const Category: React.FC = () => {
    return (
        <div className="main-page">
      
              <Container>
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
        
        
      </Slider>
            <AbsoluteBox className="w-[155px] h-[60px] left-[302px] top-[549px]" />
            <div className="w-[52px] h-10 left-[989px] top-[30px] absolute" />
            {/* <div className="w-[1440px] h-[350px] left-0 top-[120px] absolute" /> */}
            <AbsoluteBox className="w-[415px] h-[400px] left-[61px] top-[669px] rounded-[20px]" />
            <AbsoluteBox className="w-[415px] h-[400px] left-[502px] top-[669px] rounded-[20px]" />
            <div className="w-[1369px] h-[500px] left-[40px] top-[612px] absolute flex justify-center items-center">
                <div className="w-[1369px] h-[500px] bg-zinc-300 bg-opacity-10 rounded-tr-[30px]" />
            </div>
            <Banner className="left-[40px] top-[552px] w-[240px] h-[60px] rounded-tr-[24px] border-b-[60px] border-b-[#D9D9D9]/10 border-l-[35px] border-l-[#D9D9D9]/10 border-r-[60px] border-r-transparent">
                추천상품
            </Banner>
            <Banner className="left-[333px] top-[554px]">인기상승</Banner>
            <AbsoluteBox className="w-[155px] h-[60px] left-[472px] top-[549px]" />
            <Banner className="left-[492px] top-[556px]">BEST 펀딩</Banner>
            <AbsoluteBox className="w-[155px] h-[60px] left-[642px] top-[549px]" />
            <Banner className="left-[665px] top-[559px]">테크.가전</Banner>
            <AbsoluteBox className="w-[155px] h-[60px] left-[812px] top-[549px]" />
            <Banner className="left-[837px] top-[559px]">패션.잡화</Banner>
            <div className="w-10 h-10 left-[1085px] top-[35px] absolute" />
            <div className="w-9 h-[39px] left-[1174px] top-[31px] absolute" />
            <div className="absolute text-center text-white text-6xl font-bold font-['Kantumruy'] uppercase left-0 top-0"></div>
        </Container>
        </div>
    );
        
    
};



export default Category;

