import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { fundingRegAtom, optionsAtom } from "../../../../../recoil/FundingReg.Atom"
import * as styled from "../../FundingRegPage.styles"

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

function RegOptions() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)
    const [options, setOptions] = useRecoilState(optionsAtom);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target

        const replaceValue = name === "price" || name === "totalAmount" ? value.replace(/[^0-9]/g, "") : value

        const updatedOptions = options.map((option, idx) => {
            if (idx === index) {
                return {
                    ...option,
                    [name]: replaceValue,
                }
            }
            return option
        })

        setOptions(updatedOptions)
        setFunding((prev) => ({ ...prev, options: updatedOptions }))
    }

    const handleAddClick = () => {
        setOptions([...options, InitialOptionData])
    }

    const handleRemoveClick = (index: number) => {
        const list = [...options]
        list.splice(index, 1)
        setOptions(list)
    }

    const isOptionsValid = () => {
        return options.every(
            (option) =>
                option.title.length >= 5 &&
                option.price.length >= 4 &&
                option.totalAmount.length >= 2 &&
                option.info.length >= 5,
        )
    }

    const nextClick = () => {
        if (!isOptionsValid()) {
            alert("옵션정보를 입력해주세요.")
            return
        }
        navigate("../date")
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>옵션</styled.RegLabel>
            <styled.RegWrap>
                {options.map((option, index) => (
                    <styled.OptionWrap key={index}>
                        <styled.OptionInput
                            name="title"
                            value={option.title}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="옵션이름"
                            maxLength={30}
                        />
                        <styled.OptionInput
                            name="price"
                            value={option.price}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="판매가격"
                        />
                        <styled.OptionInput
                            name="totalAmount"
                            value={option.totalAmount}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="판매수량"
                            maxLength={5}
                        />
                        <styled.OptionTextArea
                            name="info"
                            value={option.info}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="상품정보"
                            maxLength={50}
                        />
                        {index > 0 && <styled.RegBtn onClick={() => handleRemoveClick(index)}>Remove</styled.RegBtn>}
                    </styled.OptionWrap>
                ))}
                <styled.RegBtn onClick={handleAddClick}>옵션추가</styled.RegBtn>
                <styled.RegBtn onClick={nextClick}>진행하기</styled.RegBtn>
                <pre className="text-white">{JSON.stringify(options, null, 2)}</pre>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegOptions
