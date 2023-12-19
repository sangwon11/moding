// import React from 'react';


// import {
//     Container,
//     CategoryItem,
//     NavContainer,
//     NavLeftButton,
//     NavLeftContainer,
//     NavRightButton,
//     NavRightContainer,
//     CategoryContainer,
//     SlideContainer
//   } from "./Category.styles"

//   const categories = ['전체', '의류', '전자제품', '도서', '가구']; // 여러분이 원하는 카테고리를 추가할 수 있습니다.

//   const Category: React.FC = () => {
//     return (
//       <CategoryContainer>
//         <NavLeftContainer>
//                   <NavLeftButton>로그인</NavLeftButton>
//               </NavLeftContainer>
  
//         <Container>
//           <NavContainer>
//             <h1 className="text-3xl font-bold mb-4">카테고리 페이지</h1>
  
//             {categories.map((category, index) => (
//               <CategoryItem key={index} to={`/category/${category.toLowerCase()}`}>
//                 {category}
//               </CategoryItem>
//             ))}
//           </NavContainer>
//         </Container>
//       </CategoryContainer>
//     );
//   };
  
//   export default Category;

import React from 'react';





  const Category: React.FC = () => {
    return (
        <div className="w-[1440px] h-[1024px] relative bg-gray-950">
<div className="w-[155px] h-[60px] left-[302px] top-[549px] absolute bg-zinc-300 bg-opacity-10 rounded-[30px]" />
<div className="w-[52px] h-10 left-[989px] top-[30px] absolute" />
<div className="w-[1440px] h-[350px] left-0 top-[120px] absolute bg-zinc-300 bg-opacity-10" />
<div className="w-[415px] h-[400px] left-[61px] top-[669px] absolute bg-zinc-300 bg-opacity-10 rounded-[20px]" />
<div className="w-[415px] h-[400px] left-[502px] top-[669px] absolute bg-zinc-300 bg-opacity-10 rounded-[20px]" />
<div className="w-[1369px] h-[400px] left-[36px] top-[624px] absolute justify-center items-center inline-flex">
<div className="w-[1369px] h-[400px] bg-zinc-300 bg-opacity-10 rounded-tr-[30px] " />
</div>
<div className="left-[40px] top-[563px] w-[240px] h-[60px] rounded-tr-[24px]  border-b-[60px] border-b-[#D9D9D9]/[.1] border-l-[35px] border-l-[#D9D9D9]/[.1] border-r-[60px] border-r-transparent absolute text-center text-white text-[25px] font-bold font-['Kantumruy']">추천상품</div>
<div className="left-[333px] top-[554px] absolute text-center text-white text-[25px] font-bold font-['Kantumruy']">인기상승</div>
<div className="w-[155px] h-[60px] left-[472px] top-[549px] absolute bg-zinc-300 bg-opacity-10 rounded-[30px]" />
<div className="left-[503px] top-[556px] absolute text-center text-white text-[25px] font-bold font-['Kantumruy']">인기상승</div>
<div className="w-[155px] h-[60px] left-[642px] top-[549px] absolute bg-zinc-300 bg-opacity-10 rounded-[30px]" />
<div className="left-[673px] top-[559px] absolute text-center text-white text-[25px] font-bold font-['Kantumruy']">인기상승</div>
<div className="w-[155px] h-[60px] left-[812px] top-[549px] absolute bg-zinc-300 bg-opacity-10 rounded-[30px]" />
<div className="left-[843px] top-[559px] absolute text-center text-white text-[25px] font-bold font-['Kantumruy']">인기상승</div>
<div className="w-10 h-10 left-[1085px] top-[35px] absolute" />
<div className="w-9 h-[39px] left-[1174px] top-[31px] absolute" />
<div className="absolute text-center text-white text-6xl font-bold font-['Kantumruy'] uppercase left-0 top-0"></div>
</div>
      
    );
  };
  
  export default Category;
  