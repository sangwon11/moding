import { Routes, Route } from "react-router-dom"
import FundingRegPage from "./FundingRegPage/FundingRegPage"
import SellerNav from "./SellerNav/SellerNav"

function SellerPage() {
    return (
        <div>
            <SellerNav />
            <Routes>
                <Route path="/" element={<FundingRegPage />} />
                <Route path="/register" element={<FundingRegPage />} />
            </Routes>
        </div>
    )
}
export default SellerPage
