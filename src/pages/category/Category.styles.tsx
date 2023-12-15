import tw from "tailwind-styled-components";
import {Link} from "react-router-dom";

interface NavLinkProps {
    to: string;
}

export const Container = tw.div`
  py-28 flex flex-col items-center 
`;

export const NavContainer = tw.div`
  flex justify-between w-[600px] text-lg font-bold text-white text-center w-[1369px] h-[400px] bg-zinc-300 bg-opacity-10 rounded-tr-[30px]
`;

export const NavLeftContainer = tw.div`
  w-[240px] h-[60px] rounded-tr-[24px]  border-b-[60px] border-b-[#D9D9D9]/[.1] border-l-[35px] border-l-[#D9D9D9]/[.1] border-r-[60px] border-r-transparent
`;

export const NavLeftButton = tw.button`
  w-[150px] h-[52px]
`;

export const NavRightContainer = tw.div`
bg-[#D9D9D9]/[.1]  w-[150px] h-[52px] rounded-[24px] 
`;

export const NavRightButton = tw(Link)<NavLinkProps>`
  w-[150px] h-[52px] flex items-center justify-center
`;

export const CategoryContainer = tw.div`
flex justify-between w-[600px] text-lg font-bold text-white text-center w-[1369px] h-[400px] bg-zinc-300 bg-opacity-10 rounded-tr-[30px]
    
`
export const SlideContainer = tw.div`
h-[300px] overflow-hidden
`



export const CategoryItem = tw(Link)`
  py-2 px-4 mb-2 bg-gray-200 rounded-md text-lg hover:bg-gray-300
`;
