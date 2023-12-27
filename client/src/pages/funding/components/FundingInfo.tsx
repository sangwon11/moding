import * as styled from "../FundingPage.styles"
import { fundingProps, optionsProps } from "../../../interface/schema.interface"

function FundingInfo({ funding }: { funding: fundingProps }) {
    return (
        <styled.MainWrap>
            <styled.NavWrap>
                <styled.NavOnWrap>
                    <styled.NavOnBtn>스토리</styled.NavOnBtn>
                </styled.NavOnWrap>
                <styled.NavBtn>새소식</styled.NavBtn>
                <styled.NavBtn>서포터</styled.NavBtn>
                <styled.NavBtn>판매자정보</styled.NavBtn>
            </styled.NavWrap>

            <styled.FundingInfoWrap>
                <styled.MainImgWrap>
                    <styled.MainImg src={funding.mainImageUrl}></styled.MainImg>
                </styled.MainImgWrap>

                <styled.MainInfoLabel>펀딩 스토리</styled.MainInfoLabel>
                <styled.MainInfoWrap dangerouslySetInnerHTML={{ __html: funding.infoDetail }}></styled.MainInfoWrap>
            </styled.FundingInfoWrap>

            <styled.RefundWrap>
                <styled.MainInfoLabel>환불·정책</styled.MainInfoLabel>
                <p>결제 취소 및 환불 안내</p>
                <p>프로젝트 종료 전 까지 언제든 결제 취소 가능해요.</p>
                <p>환불은 참여 내역에서 신청할 수 있어요.</p>
                <p>환불 신청은 리워드 수령(배송 완료) 후 7일 이내 가능해요.</p>
                <p>환불 신청 후 메이커와 소통하여 리워드를 발송해주세요.</p>
                <p>단순변심: 반품비 서포터 부담</p>
                <p>리워드 품질 하자: 반품비 메이커 부담 환불정책보기</p>
                <p>환불 정책에 따라 꼼꼼한 확인 절차를 통해 진행돼요.</p>
                <p>
                    메이커가 리워드 발송 시작 예정일까지 리워드를 발송하지 않을 경우 환불 신청 이후 즉시 결제
                    취소돼요.(2~5영업일 소요)
                </p>
                <p>2023년 11월 8일 이전에 종료된 펀딩 프로젝트는 서포터 단순변심에 의한 환불이 불가해요.</p>

                <h2>환불 불가 유형</h2>
                <ul>
                    <li>서포터의 단순변심으로 인한 반품/환불 요청이 리워드를 수령한 날로부터 7일이 지난 경우</li>
                    <li>
                        서포터의 귀책 사유로 인하여 상품이 멸실·훼손된 경우 (의류에 화장품 얼룩이 묻어있는 경우,
                        구성품의 누락, 밀봉 상품의 포장을 훼손한 경우 등)
                    </li>
                </ul>

                <h2>기타 환불 불가 규정</h2>
                <ul>
                    <li>해당제품은 소비자가 직접 조립하실수있는 DIY제품입니다.</li>
                    <li>건전지는 미포함 제품입니다.</li>
                </ul>

                <h2>A/S 정책</h2>
                <p>제품을 출고 받으신 후 한달이내 led불량일시에 부품 교체가 가능힙니다.</p>
                <p>
                    접수방법 : info@tunapaper.com으로 해당 불량 확인 영상을 접수해주시면 정확한 소명 확인후 처리 될
                    예정입니다.
                </p>
                <p>사용상의 부주의로 인한 하자는 보수는 어려운점 안내드립니다.</p>
            </styled.RefundWrap>
        </styled.MainWrap>
    )
}

export default FundingInfo
