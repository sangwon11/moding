import tw from "tailwind-styled-components";

interface NavStateProps{
    $state: string;
}

export const Container = tw.div`
text-white w-[1440px] mx-auto px-12 py-5 flex items-center justify-between`
export const Logo = tw.div`
text-3xl font-bold w-1/12`
export const NavWrap = tw.nav`
flex w-9/12 mx-12 justify-between items-center`
export const Nav = tw.nav<NavStateProps>`
${(p) => (p.$state === "Nav" ?  "w-[640px] px-12 duration-1000" : "w-14 duration-500")}
bg-[#D9D9D9]/[.1] h-12 mx-4 flex relative rounded-3xl text-centerjustify-between transition-all ease-in`
export const NavDrawerBtn = tw.button<NavStateProps>`
${(p) => (p.$state === "Nav" ?  "invisible opacity-0 w-[0px]" : "visible opacity-1")}
px-3 py-2 absolute transition-all ease-in duration-500 delay-500`
export const NavDrawerSvg = tw.img`
w-8`
export const NavDirectBtn = tw.button<NavStateProps>`
min-w-[0px] w-[160px] text-lg text-white font-bold transition-all ease-in duration-100`