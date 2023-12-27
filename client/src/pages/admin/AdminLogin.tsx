import React from "react";
import UserManagement from "./UserManagement";
import SellerManagement from "./SellerManagement";



function AdminLogin () {
  return (
    <div>
    <h1>관리자 페이지</h1>
    <UserManagement/>
    <SellerManagement/>
  </div>
);
};

export default AdminLogin;