import tw from "tailwind-styled-components";

export const Container = tw.div`flex flex-col text-white items-center p-8`
export const ContentsWrap = tw.div`bg-[#D9D9D9]/[.1] p-8 w-[1080px]`
export const TotalPriceWrap = tw.div``
export const OptionWrap = tw.div`p-6 border-b-2 border-[#D9D9D9]/[0.2] flex flex-col`
export const OptionTitle = tw.p`text-xl font-bold text-[#788FE2]`
export const OptionInfo = tw.p`text-[#D9D9D9]/[0.8]`
export const OptionPrice = tw.p`text-right`
export const SupPriceWrap = tw.div`p-6 border-b-2 border-[#D9D9D9]/[0.2] text-right`
export const SupPrice = tw.p``
export const DeliveryPriceWrap =tw.div`p-6 border-b-2 border-[#D9D9D9]/[0.2] text-right`
export const DeliveryPrice = tw.span``