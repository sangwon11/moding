import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styled from './Header.styles';

interface HeaderProps {}

function Header(props: HeaderProps){
  const navigate = useNavigate();

  const [userState, setUserState] = useState("Logout");
  const [navState, setNavState] = useState("Nav");
  const [searchInput, setSearchInput] = useState("");

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const navItems = [
    { label: "펀딩", path: "/" },
    { label: "오픈예정", path: "/" },
    { label: "카테고리", path: "/" },
    { label: "더보기", path: "/" },
  ];

  const navFunction = () => {
    if (navState === "Search") {
      setNavState("Nav");
    } else {
    }
  };

  const searchFunction = () => {
    if (navState === "Nav") {
      setNavState("Search");
    } else {
    }
  };

  return (
    <styled.Container>
      <styled.Logo>Logo</styled.Logo>

      <styled.NavWrap>
        <styled.Nav $state={navState}>
          <styled.NavDrawerBtn $state={navState} onClick={navFunction}>
            <styled.NavDrawerSvg
              alt=""
              src={require("../../assets/svg/menu_icon.svg").default}></styled.NavDrawerSvg>
          </styled.NavDrawerBtn>
          {navItems.map((item, index) => (
            <button
              className={`min-w-[0px] w-[160px] text-lg text-white font-bold transition-all ease-in duration-100 ${
                navState === "Nav"
                  ? "visible opacity-1 delay-1000"
                  : "invisible opacity-0 w-[0px]"
              }`}
              key={index}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </styled.Nav>

        {/*Search*/}
        <div
          className={`bg-[#D9D9D9]/[.1] h-12 p-2 rounded-3xl flex justify-between transition-all ease-in ${
            navState === "Nav" ? "w-14 duration-500" : "w-[640px] duration-1000"
          }`}
        >
          <input
            className={`bg-transparent text-xl transition-all outline-none ease-in ${
              navState === "Nav"
                ? "invisible w-[0px] duration-100"
                : "visible w-[520px] mx-8 duration-1000"
            }`}
            value={searchInput}
            onChange={onChangeSearchInput}
          ></input>
          <button onClick={searchFunction}>
            <img
              className="w-10"
              alt=""
              src={require("../../assets/svg/search_icon.svg").default}
            ></img>
          </button>
        </div>
      </styled.NavWrap>

      {/*Gnb*/}
      <div className="flex w-2/12 min-w-fit text-lg font-bold text-center space-x-2 justify-between">
        {userState === "Logout" ? (
          <>
            <button className="bg-[#D9D9D9]/[.1] w-32 h-12 rounded-3xl">
              로그인
            </button>
            <button
              className="bg-[#D9D9D9]/[.1] w-32 h-12 rounded-3xl"
              onClick={() => navigate("/sign-up")}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-[#D9D9D9]/[.1] w-14 h-12 rounded-3xl ml-2 "
              onClick={searchFunction}
            >
              <img
                className="w-8 m-auto"
                alt=""
                src={require("../../assets/svg/heart_icon.svg").default}
              ></img>
            </button>
            <button
              className="bg-[#D9D9D9]/[.1] w-14 h-12 rounded-3xl"
              onClick={searchFunction}
            >
              <img
                className="w-8 m-auto"
                alt=""
                src={require("../../assets/svg/user_icon.svg").default}
              ></img>
            </button>
            <button
              className="bg-[#D9D9D9]/[.1] w-32 h-12 rounded-3xl font-bold"
              onClick={() => navigate("/")}
            >
              프로젝트
            </button>
          </>
        )}
      </div>
    </styled.Container>
  );
};

export default Header;
