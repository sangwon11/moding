import tw from "tailwind-styled-components"

export const Container = tw.div`flex items-center overflow-auto`

export const RegTage = tw.p`text-white`

export const AddBtn = tw.button`text-xl bg-blue-500 font-bold h-[56px] w-[400px] rounded-3xl`

export const CKEitorWrap = tw.div`w-[660px] text-black`

//regNav
export const RegNavWrap = tw.div`w-[360px]`

//reg

export const RoutesWrap = tw.div`w-[720px] min-h-[480px]`

export const RegContainer = tw.div`px-10 h-auto flex flex-col space-y-6 text-white min-h-[480px]`
export const RegLabel = tw.label`text-2xl font-bold text-slate-300`
export const RegText = tw.p`mr-[400px]`

export const RegWrap = tw.div`p-10 flex flex-col space-y-6 text-white items-center`

export const RegInput = tw.input`px-6 h-[44px] w-[400px] rounded-md text-black`
export const RegTextArea = tw.textarea`py-2 px-6 h-[112px] w-[400px] rounded-md text-black`
export const RegBtn = tw.button`bg-blue-500 font-bold h-[56px] w-[400px] rounded-3xl text-white`

export const CategorySelect = tw.select`px-6 h-[44px] w-[400px] rounded-md text-black`
export const CategoryOption = tw.option`h-[44px] w-[400px] rounded-md text-black`

export const OptionWrap = tw.div`bg-[#D9D9D9]/[.5] p-5 flex flex-col space-y-3 rounded-md text-black`
export const OptionInput = tw.input`px-6 h-[44px] w-[400px] rounded-md`
export const OptionTextArea = tw.textarea`py-2 px-6 h-[88px] w-[400px] rounded-md`

export const DateInput = tw.input`block w-full px-3 py-[0.5rem] text-base placeholder-gray-400 border rounded-md transition-all duration-200 ease-in-out focus:ring focus:border-primary-400 focus:placeholder-opacity-0 text-black w-[400px]`
export const DateLabel = tw.label`absolute left-12 top-5 pt-[0.5rem] text-base text-gray-400 transition-all duration-200 ease-in-out`