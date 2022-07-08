import { useState } from "react";
import Login from "../components/sign/Login";
import Signup from "../components/sign/Signup";

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
    <div className="sign_page">
      {!isSign ? (
        <Login onChange={changeSignPage} />
      ) : (
        <Signup onChange={changeLoginPage} />
      )}
    </div>
      <style jsx>{`
        .sign_page {
          height: calc(100vh - 130px);
          display:flex;
          align-items: center;
          justify-content:center;
        }      
        `}</style>
    </>
  );
}
