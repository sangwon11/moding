import tw from "tailwind-styled-components";

export const Container = tw.div`flex flex-col text-white items-center p-8`
export const ContentsWrap = tw.div`bg-[#D9D9D9]/[.1] p-8 w-[720px] text-center`
export const PriceWrap = tw.div``
export const OptionWrap = tw.div`p-4 border-b border-[#D9D9D9]/[0.2] flex flex-col text-left`
export const OptionTitle = tw.p`text-xl font-bold text-[#788FE2]`
export const OptionInfo = tw.p`text-[#D9D9D9]/[0.8]`
export const OptionPrice = tw.p`text-right`
export const SupPriceWrap = tw.div`p-4 border-b border-[#D9D9D9]/[0.2] text-right`
export const SupPrice = tw.p``
export const DeliveryPriceWrap =tw.div`p-4 border-b border-[#D9D9D9]/[0.2] text-right`
export const DeliveryPrice = tw.span``
export const TotalPriceWrap = tw.div`p-4 flex justify-between text-xl font-bold`
export const TotalPriceTag = tw.p``
export const TotalPrice = tw.p``

export const OrderWrap = tw.div`py-4`
export const OrderMethodWrap = tw.div`p-2 flex justify-between`
export const OrderCheckBox = tw.input`w-5 h-5 cursor-pointer accent-[#D9D9D9]/[.1]`
export const OrderMethodLabel = tw.p``

export const NextWrap = tw.div`flex flex-col items-center space-y-5`
export const NextBtn = tw.button`text-xl bg-blue-500 font-bold h-[56px] w-[400px] rounded-3xl`

export const MeWrap = tw.div`flex flex-col py-6 border-y border-[#D9D9D9]/[0.2]`
export const MeLabel = tw.label`text-xl font-bold text-slate-300 text-left py-3`
export const InputWrap = tw.div`flex flex-col items-center`
export const Input = tw.input`bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] my-1`;