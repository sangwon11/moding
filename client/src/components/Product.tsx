import React from "react"
import { useNavigate } from "react-router-dom"
import tw from "tailwind-styled-components"
import { formatPercentage } from "../utils/format.utils"

interface ProductProps {
    id: string
    url: string
    alt: string
    description: string
    isSlider?: boolean
    isRightSection?: boolean
    currentAmount?: number
    goalAmount?: number
}

function Product({ id, url, alt, description, isSlider, isRightSection, currentAmount, goalAmount }: ProductProps) {
    const containerClassName = isSlider ? "w-full" : "w-1/3"
    const percentage = currentAmount && goalAmount ? formatPercentage(currentAmount, goalAmount) : "0"
    const navigate = useNavigate()

    if (isRightSection) {
        return (
            <div
                className="flex justify-between items-center px-2 mb-4 cursor-pointer"
                key={id}
                onClick={() => navigate("/funding", { state: id })}
            >
                <p className="text-white text-sm font-semibold mr-3">{description}</p>
                <ImageRightContainer>
                    <RightImage src={url} alt={alt} />
                </ImageRightContainer>
            </div>
        )
    }

    return (
        <div className={`${containerClassName} px-2 mb-4`} key={id}>
            <ImageContainer>
                <Image src={url} alt={alt} onClick={() => navigate("/funding", { state: id })} />
            </ImageContainer>
            <DescriptionContainer>
                <Description>{description}</Description>
                <Manufacturer>{`${percentage}% 달성`}</Manufacturer>
            </DescriptionContainer>
        </div>
    )
}
const ImageRightContainer = tw.div`
w-40 h-20 rounded-lg cursor-pointer overflow-hidden
`
const RightImage = tw.img`
w-20 h-20 rounded-lg cursor-pointer overflow-hidden
`

const ImageContainer = tw.div`
  w-full h-64 overflow-hidden rounded-lg bg-gray-200 cursor-pointer 
`

const Image = tw.img`
  object-cover object-center w-full h-full
`

const DescriptionContainer = tw.div`
  text-sm mt-3
`

const Description = tw.p`
  text-white text-lg font-semibold mb-3
`

const Manufacturer = tw.p`
  text-gray-500 text-sm
`

export default Product
