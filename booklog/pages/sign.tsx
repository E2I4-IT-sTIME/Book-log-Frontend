import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function sign() {
  const [isSign, setIsSign] = useState(false);
  const changeSignPage = () => {
    setIsSign(true);
  };
  return (
    //로그인, 회원가입
    <>{!isSign ? <Login onChange={changeSignPage} /> : <Signup />}</>
  );
}
