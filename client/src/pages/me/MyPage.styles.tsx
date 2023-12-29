import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center my-12 rounded-[24px] bg-[#D9D9D9]/[.1] w-[1080px] text-lg text-white`
export const PageLabel = tw.label`text-2xl font-bold text-gray-300 mb-12`
//me
export const MeWrap = tw.div`flex flex-col my-12 w-[1080px] px-20`
export const InputWrap = tw.div`flex flex-col items-center`
export const Input = tw.input`bg-[#D9D9D9]/[.1] w-[400px] h-14 ps-8 pe-8 outline-none rounded-[24px] my-1`;
// orderList
export const OrdersWrap = tw.div`flex flex-col my-12 w-[1080px] px-20 space-y-3`
export const OrderWrap = tw.div`bg-[#D9D9D9]/[.1] p-6 rounded-[24px] flex items-center`
export const OrderDate = tw.p`pl-5 font-bold`
export const OrderNumber = tw.p``
export const Wrap = tw.div`space-y-4 px-9`
export const ImgWrap = tw.div`w-[200px] h-[150px]`
export const Img = tw.img`rounded-[12px] h-full w-full object-cover`
export const TitleWrap = tw.div`flex flex-col p-4 w-[250px]`
export const Title = tw.p`font-bold`
export const Text = tw.p`text-base`
export const TagWrap = tw.div`bg-[#D9D9D9]/[.1] py-3 rounded-[24px] flex items-center space-x-8 font-bold px-7`
export const Tag100 = tw.p`w-[100px] text-center`
export const Tag200 = tw.p`w-[200px] text-center`
export const Tag250 = tw.p`w-[250px] text-center`

//seller
export const SellerWrap = tw.div`flex flex-col items-center space-y-6`
export const SellerBtn = tw.button`text-xl bg-blue-500 font-bold h-[56px] w-[400px] rounded-3xl`