import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center my-12 rounded-[24px] bg-[#D9D9D9]/[.1] w-[1080px] text-lg font-bold text-white`
export const PageLabel = tw.label`text-2xl font-bold text-gray-300 mb-12`
//me
export const MeWrap = tw.div`flex flex-col my-12 w-[1080px] px-20`
export const InputWrap = tw.div`flex flex-col items-center`
export const Input = tw.input`bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] my-1`;
// orderList
export const OrdersWrap = tw.div`flex flex-col my-12 w-[1080px] px-20 space-y-3`
export const OrderWrap = tw.div`bg-[#D9D9D9]/[.1] p-6 rounded-[24px]`
export const OrderNumber = tw.p``