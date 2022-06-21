import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function sign() {
  const [isSign, setIsSign] = useState(false);
  const changeSignPage = () => {
    setIsSign(true);
  }

  const changeLoginPage = () => {
    setIsSign(false);
  };
  return (
    <>
      {!isSign ? (
        <Login onChange={changeSignPage} />
      ) : (
        <Signup onChange={changeLoginPage} />
      )}
    </>
  );
}
