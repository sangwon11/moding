import React from "react"
import * as styled from "./Footer.styles"

function Footer() {
    return (
        <styled.StyledFooter>
            <styled.UpperWrap>
                <styled.Logo>
                    <styled.LogoImg src={require("../../assets/logo.png")} />
                </styled.Logo>

                <styled.CorInfoWrap>
                    <styled.CorInfo>
                        대표 모두의 펀딩
                        <br />
                        통신판매업신고번호: 2023-앨리스1팀-3553
                        <br />
                        이메일 상담: Weedh@modding.kr
                        <br />
                        서울특별시 성동구 아차산로17길 48
                    </styled.CorInfo>
                </styled.CorInfoWrap>
            </styled.UpperWrap>

            <styled.RuleInfo>
                일부 상품의 경우 모딩은 통신판매중개자이며 통신판매 당사자가 아닙니다.
                <br />
                해당되는 상품의 경우 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있으므로, 각 상품 페이지에서
                구체적인 내용을 확인하시기 바랍니다.
            </styled.RuleInfo>

            <styled.FooterCopyright>© Moding Co., Ltd.</styled.FooterCopyright>
        </styled.StyledFooter>
    )
}

export default Footer
