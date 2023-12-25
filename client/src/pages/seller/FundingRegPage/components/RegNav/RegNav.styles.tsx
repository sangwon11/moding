import tw from "tailwind-styled-components"

interface BtnProps {
    $validator: boolean
}

export const Container = tw.div`w-[360px] flex flex-col self-start text-white text-xl font-bold h-fit`

export const StickyWrap = tw.div`sticky top-0`
export const NavBtnWrap = tw.div`w-[360px] flex`
export const NavBtnLabel = tw.div<BtnProps>`w-[10px]
${(p) => (p.$validator ? "bg-green-400" : "bg-red-400")}`
export const NavBtn = tw.button`bg-[#D9D9D9]/[.1] h-[60px] w-[330px] hover:bg-[#D9D9D9]/[.2] rounded-r-s`
