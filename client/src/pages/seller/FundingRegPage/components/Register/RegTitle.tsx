import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom"
import * as styled from "../../FundingRegPage.styles"

function RegTitle() {
    const navigate = useNavigate()
    const [funding, setFunding] = useRecoilState(fundingRegAtom)

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunding((prev) => ({ ...prev, title: e.target.value }))
    }
    const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFunding((prev) => ({ ...prev, info: e.target.value }))
    }

    const isTitleValid = () => funding.title.length >= 6 && funding.info.length  >= 10

    const nextClick = () => {
        if (!isTitleValid()) {
            alert("펀딩정보를 입력해주세요.")
            return
        }
        navigate("../category")
    }

    return (
        <styled.RegContainer>
            <styled.RegLabel>펀딩정보</styled.RegLabel>
            <styled.RegWrap>
                <styled.RegText>펀딩타이틀</styled.RegText>
                <styled.RegInput value={funding.title} onChange={handleTitleChange} maxLength={20} />
                <styled.RegText>펀딩정보</styled.RegText>
                <styled.RegTextArea value={funding.info} onChange={handleInfoChange} maxLength={40} />
                <styled.RegBtn onClick={nextClick}>진행하기</styled.RegBtn>
            </styled.RegWrap>
        </styled.RegContainer>
    )
}

export default RegTitle

// const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//     const confirmationMessage = '변경사항이 저장되지 않을 수 있습니다. 정말 이 페이지를 떠나시겠습니까?';
//     e.preventDefault();
//     e.returnValue = confirmationMessage;
//     return confirmationMessage;
// };

// useEffect(() => {
//     window.addEventListener('beforeunload', handleBeforeUnload);
// }, []);
