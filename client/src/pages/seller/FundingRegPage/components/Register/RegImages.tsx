import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"
import * as styled from "../../FundingRegPage.styles"
import { axiosInstance } from "../../../../../utils/axios.utils"
import { useState } from "react"

function RegImages() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || !files[0]) {
            console.error("파일이 선택되지 않았습니다.")
            return
        }

        const file = files[0]
        const formData = new FormData()
        formData.append("image", file)

        const imageUrl = URL.createObjectURL(file)
        setPreviewUrl(imageUrl)

        try {
            const response = await axiosInstance.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            const imageUrl = response.data.data
            setFunding((prev) => ({ ...prev, mainImageUrl: imageUrl }))
        } catch (error) {
            console.error("이미지 업로드 에러", error)
        }
    }

    const isImagesValid = () => funding.mainImageUrl.length !== 0

    const nextClick = () => {
        if (!isImagesValid()) {
            alert("메인이미지를 넣어주세요.")
            return
        }
        navigate("../options")
    }
    return (
        <styled.RegContainer>
            <styled.RegLabel>사진</styled.RegLabel>
            <styled.RegWrap>
                <styled.RegText>메인이미지</styled.RegText>
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ maxWidth: "200px", maxHeight: "200px", marginBottom: "10px" }}
                    />
                )}
                <styled.RegImageInput type="file" value={funding.title} onChange={handleMainImageChange} />
                <styled.RegBtn onClick={nextClick}>진행하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegImages
