import { useEffect, useState } from "react"
import * as styled from "../../FundingRegPage.styles"
import { axiosInstance } from "../../../../../utils/axios.utils"
import { useRecoilState } from "recoil"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface CategoryProps {
    _id: string
    categoryName: string
}

function RegCategory() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)
    const [categories, setCategories] = useState<CategoryProps[]>([])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFunding((prev) => ({ ...prev, categoryId: e.target.value }))
    }

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/category")
            setCategories(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                window.alert("잘못된 접근입니다.")
                navigate("/404")
            }
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const isCategoryValid = () => funding.categoryId.length !== 0

    const nextClick = () => {
        if (!isCategoryValid()) {
            alert("카테고리를 선택해주세요.")
            return
        }
        navigate("../images")
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>카테고리</styled.RegLabel>
            <styled.RegWrap>
                <styled.CategorySelect onChange={handleSelectChange} value={funding.categoryId}>
                    <styled.CategoryOption value="">카테고리 선택</styled.CategoryOption>
                    {categories.map((category) => (
                        <styled.CategoryOption key={category._id} value={category._id}>
                            {category.categoryName}
                        </styled.CategoryOption>
                    ))}
                </styled.CategorySelect>
                <styled.RegBtn onClick={nextClick}>진행하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegCategory
