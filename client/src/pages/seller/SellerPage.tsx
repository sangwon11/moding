import { Routes, Route } from "react-router-dom"
import FundingRegPage from "./FundingRegPage/FundingRegPage"
import SellerNav from "./SellerNav/SellerNav"
import RegRouter from "./FundingRegPage/RegisterRouter"

function SellerPage() {
    return (
        <div>
            <SellerNav />
            <Routes>
                <Route path="/register/*" element={<RegRouter />} />
            </Routes>
        </div>
    )
}
export default SellerPage
