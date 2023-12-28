import { Routes, Route } from "react-router-dom"
import SellerNav from "./SellerNav/SellerNav"
import RegRouter from "./FundingRegPage/RegisterRouter"
import * as styled from "./SellerPage.styles"

function SellerPage() {
    return (
        <div className="flex flex-col items-center">
            <styled.Container>
                <SellerNav />
                <Routes>
                    <Route path="/register/*" element={<RegRouter />} />
                </Routes>
            </styled.Container>
        </div>
    )
}
export default SellerPage
