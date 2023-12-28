import { Routes, Route } from "react-router-dom"

import RegStart from "./components/Register/RegStart"
import RegTitle from "./components/Register/RegTitle"
import RegCategory from "./components/Register/RegCategory"
import RegDate from "./components/Register/RegDate"
import RegGoal from "./components/Register/RegGoal"
import RegOptions from "./components/Register/RegOptions"
import RegDelivery from "./components/Register/RegDeilvery"
import RegEditor from "./components/Register/RegEditor"
import RegNav from "./components/RegNav/RegNav"
import RegComplete from "./components/Register/RegComplete"
import RegImages from "./components/Register/RegImages"

import * as styled from "../FundingRegPage/FundingRegPage.styles"

function RegRouter() {
    return (
        <styled.Container>
            <RegNav />
            <styled.RoutesWrap>
                <Routes>
                    <Route path="/" element={<RegStart />} />
                    <Route path="/title" element={<RegTitle />} />
                    <Route path="/category" element={<RegCategory />} />
                    <Route path="/images" element={<RegImages />} />
                    <Route path="/date" element={<RegDate />} />
                    <Route path="/goal" element={<RegGoal />} />
                    <Route path="/options" element={<RegOptions />} />
                    <Route path="/delivery" element={<RegDelivery />} />
                    <Route path="/goal" element={<RegGoal />} />
                    <Route path="/editor" element={<RegEditor />} />
                    <Route path="/complete" element={<RegComplete />} />
                </Routes>
            </styled.RoutesWrap>
        </styled.Container>
    )
}
export default RegRouter
