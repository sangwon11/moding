import MyPageNav from "./components/mypagenav/MyPageNav"
import { Routes, Route } from "react-router-dom"
import * as styled from "./MyPage.styles"
import Me from "./components/Me"
import Order from "./components/Order"
import RegSeller from "./components/RegSeller"


function MyPage() {
    return (
        <div className="flex flex-col items-center">
            <styled.Container>
                <MyPageNav />
                <Routes>
                    <Route path="/" element={<Me />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/seller" element={<RegSeller />} />
                </Routes>
            </styled.Container>
        </div>
    )
}

export default MyPage
