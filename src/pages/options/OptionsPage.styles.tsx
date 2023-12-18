import tw from "tailwind-styled-components";

export const Container = tw.div`flex flex-col text-white items-center p-8`
export const FundingTitle = tw.span`bg-[#D9D9D9]/[.1] w-[1080px] text-center text-3xl`
export const OptionsWrap = tw.div`bg-[#D9D9D9]/[.1] w-[1080px] p-8`
export const OptWrap = tw.div`p-6 border-b-2 border-[#D9D9D9]/[0.2]`
export const OptTop = tw.div`flex space-x-4 h-12 items-center h-auto pb-4`
export const OptCheckBox = tw.input`w-6 h-6 cursor-pointer accent-[#D9D9D9]/[.1]`
export const OptPrice = tw.span`h-9 text-2xl font-bold after:text-base px-2`
export const OptPriceTag = tw.span`text-base`
export const OptMid = tw.div`flex space-x-4 h-12 items-center h-auto pb-2`
export const OptTitle = tw.span`text-xl font-bold`
export const OptTotalAmount = tw.span`text-[#D9D9D9]/[0.5]`
export const OptCurrentAmount = tw.span`text-[#788FE2]`
export const OptInfo = tw.span`text-[#D9D9D9]/[0.8]`
export const OptBot = tw.div`flex space-x-4 h-12 items-center h-auto pt-6 pb-2`
export const DeliveryPrice = tw.p``
export const DeliveryDate = tw.p``
export const SupWrap = tw.div`text-xl bg-[#D9D9D9]/[.1] w-[1080px] p-8 flex text-left`
export const SupTitle = tw.span`font-bold mx-6 w-[300px]`
export const SupPrice = tw.input`bg-[#D9D9D9]/[.1] w-[260px] h-14 ps-8 pe-8 outline-none rounded-[24px] text-right mx-4`
export const PrivateWrap = tw.div`text-xl bg-[#D9D9D9]/[.1] w-[1080px] p-8 flex text-left`
export const PrivateTitle = tw.span`font-bold mx-6 w-[300px]`
export const PrivateCheckWrap = tw.div`flex`
export const NameCheckBox = tw.input`w-6 h-6 cursor-pointer accent-[#D9D9D9]/[.1]`
export const PriceCheckBox = tw.input`w-6 h-6 cursor-pointer accent-[#D9D9D9]/[.1]`
export const NextBtn = tw.button`bg-[#D9D9D9]/[.1] w-[200px]`

export const SubTitleWrap = tw.div`w-[300px] h-[80px]`