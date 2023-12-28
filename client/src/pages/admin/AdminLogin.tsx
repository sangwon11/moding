import React from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import UserMembersList from "./UserMembersList";
import {Container, NavWrap, NavBtn} from './AdminLogin.styles';
import SellerApplicationForm from "./SellerMembersLIst";


function AdminLogin() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center">
            <Container>
            <NavWrap>
            <NavBtn onClick={()=>navigate("/userlist")}>회원 관리</NavBtn>
            <NavBtn onClick={()=>navigate("/sellerlist")}>샐러 관리</NavBtn>
        </NavWrap>
                <Routes>
                    <Route path="/userlist" element={<UserMembersList/>} />
                    <Route path="/sellerlist" element={<SellerApplicationForm/>} />
                </Routes>
                
        
            </Container>
        </div>
        
    );
    }


export default AdminLogin;