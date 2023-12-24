import { atom } from "recoil"

interface OptionData {
    title: string
    price: string
    totalAmount: string
    info: string
}

const InitialOptionData: OptionData = {
    title: "",
    price: "",
    totalAmount: "",
    info: "",
}

export const fundingRegAtom = atom({
    key: "fundingRegAtom",
    default: {
        seller: "",
        title: "",
        categoryId: "",
        info: "",
        mainImageUrl: "",
        imageUrls: [{}],
        goalAmount: "",
        startDate: "",
        endDate: "",
        deliveryPrice: "",
        deliveryDate: "",
        options: [InitialOptionData],
        infoDetail: "",
    },
})
