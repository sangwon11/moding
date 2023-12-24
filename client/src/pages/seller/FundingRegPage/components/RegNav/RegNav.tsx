import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fundingRegAtom } from "../../../../../recoil/FundingReg.Atom";
import * as styled from "./RegNav.styles";

function RegNav() {
    const navigate = useNavigate();
    const [funding, setFunding] = useRecoilState(fundingRegAtom);

    const validations = {
        seller: funding.seller.trim().length !== 0,
        title: funding.title.length >= 6 && funding.info.length >= 10,
        category: funding.categoryId.trim().length > 0,
        options: funding.options.every(
            (option) => option.title.length >= 5 && option.price.length >= 4 && option.totalAmount.length >= 2 && option.info.length >= 5
        ),
        date: funding.startDate.length !== 0 && funding.endDate.length !== 0,
        delivery: funding.deliveryDate.length !== 0 && funding.deliveryPrice.length !== 0,
        goal: funding.goalAmount.length >= 6,
        story: funding.infoDetail.length !== 0
    };

    const completeValidation = Object.values(validations).every(Boolean);

    const navItems = [
        { label: "시작하기", path: "./", validation: validations.seller },
        { label: "펀딩정보", path: "./title", validation: validations.title },
        { label: "카테고리", path: "./category", validation: validations.category },
        { label: "옵션", path: "./options", validation: validations.options },
        { label: "펀딩기간", path: "./date", validation: validations.date },
        { label: "배송", path: "./delivery", validation: validations.delivery },
        { label: "목표금액", path: "./goal", validation: validations.goal },
        { label: "스토리", path: "./editor", validation: validations.story },
        { label: "완료하기", path: "./complete", validation: completeValidation },
    ];

    return (
        <styled.Container>
            <styled.StickyWrap>
                {navItems.map((item, index) => (
                    <styled.NavBtnWrap key={index}>
                        <styled.NavBtnLabel $validator={item.validation}></styled.NavBtnLabel>
                        <styled.NavBtn onClick={() => navigate(item.path)}>{item.label}</styled.NavBtn>
                    </styled.NavBtnWrap>
                ))}
            </styled.StickyWrap>
        </styled.Container>
    );
}

export default RegNav;