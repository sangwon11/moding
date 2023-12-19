import tw from "tailwind-styled-components";
interface PercentProps{
    $percent: string;
}

export const Container = tw.div`text-white`;
export const AttainmentWrap = tw.div`w-auto h-[300px] bg-[#D9D9D9]/[.1] overflow-hidden font-bold text-1xl`;
export const InfoWrap = tw.div`flex max-w-[1440px] h-[200px] items-center justify-center m-auto`
export const PercentWrap = tw.div`mx-20`;
export const PercentLabel = tw.p`text-7xl font-bold`;
export const AmountWrap = tw.div`flex`;
export const CurrentAmountWrap = tw.div`px-2`;
export const CurrentAmountLabel = tw.p`text-[#D9D9D9]/[.6]`;
export const CurrentAmount = tw.p`text-2xl`;
export const GoalAmountWrap = tw.div`px-2`;
export const GoalAmountLabel = tw.p`text-[#D9D9D9]/[.6] px-2`;
export const GoalAmount = tw.p`text-2xl`;
export const ProcessWrap = tw.div`flex max-w-[1080px] h-[100px] items-center m-auto`;
export const PercentBarWrap = tw.div`w-[100%] h-[50px] bg-[#D9D9D9]/[.1] rounded-[24px] flex`
export const CurrentPercent =tw.div<PercentProps>`bg-[#D9D9D9]/[.6] h-[50px] flex px-10 rounded-[24px]
${(p) => (p.$percent)}`
export const CurrentPercentLabel =tw.p`` 
export const LeftPercent = tw.div<PercentProps>`bg-[#D9D9D9]/[0.1] h-[50px] flex px-10 rounded-[24px]
${(p) => (p.$percent)}`;
export const LeftPercentLabel =tw.p``
export const ContentsWrap = tw.div`m-20 w-[1440px] flex`;
export const MainWrap = tw.div`w-[60%] pr-2`
export const NavWrap = tw.div`flex justify-between text-lg font-bold text-white`;
export const NavBtn = tw.button`bg-[#D9D9D9]/[.1] w-[150px] h-[52px] rounded-[24px]`;
export const NavOnWrap = tw.div`w-[240px] h-[60px] rounded-tl-[24px] border-b-[60px] border-b-[#D9D9D9]/[.1] border-r-[60px] border-l-[#D9D9D9]/[.1] border-r-[60px] border-r-transparent`;
export const NavOnBtn = tw.button`w-[150px] h-[52px]`;
export const FundingInfoWrap = tw.div`bg-[#D9D9D9]/[.1] h-auto py-12 text-white text-lg rounded-[24px] rounded-tl-[0px] flex flex-col justify-center items-center`;
export const FloatingWrap = tw.div`w-[40%]`
export const NavRightWrap = tw.div`w-[240px] h-[60px] justify-right rounded-tr-[24px] border-b-[60px] border-b-[#D9D9D9]/[.1] border-r-[60px] border-r-[#D9D9D9]/[.1] border-l-[60px] border-l-transparent`;
export const NavRightBtn = tw.button`w-[150px] h-[52px]`;
export const FloatingInfoWrap = tw.div`bg-[#D9D9D9]/[.1] h-auto py-12 text-white text-lg rounded-[24px] rounded-tr-[0px] flex flex-col justify-center items-center`;