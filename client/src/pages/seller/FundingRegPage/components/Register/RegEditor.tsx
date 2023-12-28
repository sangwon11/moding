import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../../../../utils/axios.utils"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"
import { useRecoilState } from "recoil"

import { CKEditor } from "@ckeditor/ckeditor5-react"
//import Editor from "ckeditor5-custom-build/build/ckeditor"
import "./../ckediter/CKEditer.styles.css"
import { editorConfig } from "../ckediter/CKEditer.config"
import * as styled from "../../FundingRegPage.styles"

function RegEditor() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)

    const handleInfoDetailChange = (e: any, editor: any) => {
        const data = editor.getData()
        setFunding((prev) => ({ ...prev, infoDetail: data }))
    }

    const [uploadedImageName, setUploadedImageName] = useState<string[]>([])

    const handlePageLeave = async (e: BeforeUnloadEvent) => {
        for (const imageName of uploadedImageName) {
            try {
                await axiosInstance.delete(`/upload/${imageName}`)
                console.log(`이미지 삭제 완료: ${imageName}`)
            } catch (error) {
                console.error(`이미지 삭제 에러: ${imageName}`, error)
            }
        }
        setUploadedImageName([])
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handlePageLeave)
        return () => {
            window.removeEventListener("beforeunload", handlePageLeave)
        }
    }, [uploadedImageName])

    return (
        <styled.RegContainer>
            <styled.RegLabel>스토리</styled.RegLabel>
            <styled.RegWrap>
                <styled.CKEitorWrap>
                    {/* <CKEditor
                        editor={Editor}
                        data={funding.infoDetail}
                        config={editorConfig}
                        onReady={(editor: any) => {
                            editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
                                return {
                                    upload: async () => {
                                        const formData = new FormData()
                                        formData.append("image", await loader.file)

                                        try {
                                            const response = await axiosInstance.post("/upload", formData, {
                                                headers: {
                                                    "Content-Type": "multipart/form-data",
                                                },
                                            })
                                            console.log(response.data.data.slice(9))
                                            setUploadedImageName((prevName) => [
                                                ...prevName,
                                                response.data.data.slice(9),
                                            ])
                                            return {
                                                default: response.data.data,
                                            }
                                        } catch (error) {
                                            console.error("이미지 업로드 에러", error)
                                            throw error
                                        }
                                    },
                                }
                            }
                        }}
                        onChange={handleInfoDetailChange}
                    /> */}

                    <styled.RegBtn onClick={() => navigate("../complete")}>진행하기</styled.RegBtn>
                </styled.CKEitorWrap>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegEditor
