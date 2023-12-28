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
                <styled.RefundLabel>결제 취소 및 환불 안내</styled.RefundLabel>
                <styled.RefundText>프로젝트 종료 전 까지 언제든 결제 취소 가능해요.</styled.RefundText>
                <styled.RefundText>환불은 구매 내역에서 신청할 수 있어요.</styled.RefundText>
                <styled.RefundText>환불 신청은 리워드 수령(배송 완료) 후 7일 이내 가능해요.</styled.RefundText>
                <styled.RefundText>환불 신청 후 메이커와 소통하여 리워드를 발송해주세요.</styled.RefundText>
                <styled.RefundText>단순변심: 반품비 서포터 부담</styled.RefundText>
                <styled.RefundText>리워드 품질 하자: 반품비 메이커 부담</styled.RefundText>
                <styled.RefundText>환불 정책에 따라 꼼꼼한 확인 절차를 통해 진행돼요.</styled.RefundText>
                <styled.RefundText>
                    메이커가 리워드 발송 시작 예정일까지 리워드를 발송하지 않을 경우 환불 신청 이후 즉시 결제
                    취소돼요.(2~5영업일 소요)
                </styled.RefundText>
                <styled.RefundText>
                    2023년 11월 8일 이전에 종료된 펀딩 프로젝트는 서포터 단순변심에 의한 환불이 불가해요.
                </styled.RefundText>

                <styled.RefundLabel>환불 불가 유형</styled.RefundLabel>
                <styled.RefundText>
                    서포터의 단순변심으로 인한 반품/환불 요청이 리워드를 수령한 날로부터 7일이 지난 경우
                </styled.RefundText>
                <styled.RefundText>
                    서포터의 귀책 사유로 인하여 상품이 멸실·훼손된 경우 (의류에 화장품 얼룩이 묻어있는 경우, 구성품의
                    누락, 밀봉 상품의 포장을 훼손한 경우 등)
                </styled.RefundText>
                <styled.RefundText>
                    신선·냉동식품, 식물 등 시간이 지남에 따라 재판매가 곤란할 정도로 가치가 떨어지는 리워드인 경우
                </styled.RefundText>
                <styled.RefundText>
                    숙박권, 촬영권 등 사전 예약이 필요한 리워드의 사용 기한이 임박하여 재판매가 어려운 경우 (단, 사용
                    기한의 임박 시점은 메이커가 정한 내용을 따릅니다.)
                </styled.RefundText>
                <styled.RefundText>
                    각인, 도장, 1:1 맞춤 제작 등 주문에 따라 개별적으로 생산되는 리워드인 경우
                </styled.RefundText>
                <styled.RefundText>
                    전자 티겟(QR코드, 바코드 포함) 등 사실상 회수가 불가능하여 메이커에게 중대한 피해가 예상되는 경우
                </styled.RefundText>
                <styled.RefundText>
                    해외에서 개별적으로 수입하는 제품으로서 반품 물류비용 발생 및 국내 재판매 불가 등으로 메이커에게
                    중대한 피해가 예상되는 경우
                </styled.RefundText>
                <styled.RefundText>
                    전자책, CD, DVD, 소프트웨어 등 복제가 가능한 리워드를 개시 및 열람한 경우
                </styled.RefundText>
                <styled.RefundText>기부·후원 목적으로 성공금을 모집 및 사용하는 펀딩 프로젝트인 경우</styled.RefundText>
                <styled.RefundText>기타 법령 및 약관에 의해 리워드 반품이 제한되는 경우</styled.RefundText>

                <styled.RefundLabel>A/S 정책</styled.RefundLabel>
                <styled.RefundText>제품을 출고 받으신 후 한달이내 불량일시에 부품 교체가 가능힙니다.</styled.RefundText>
                <styled.RefundText>
                    접수방법 : info@tunapaper.com으로 해당 불량 확인 영상을 접수해주시면 정확한 소명 확인후 처리 될
                    예정입니다.
                </styled.RefundText>
                <styled.RefundText>사용상의 부주의로 인한 하자는 보수는 어려운점 안내드립니다.</styled.RefundText>
            </styled.RefundWrap>
        </styled.MainWrap>
    )
}

export default FundingInfo
