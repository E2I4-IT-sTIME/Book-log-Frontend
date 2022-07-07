import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import logo from "../Img/logo_color.png";
import google from "../Img/google.png";
import kakao from "../Img/kakao.png";
import naver from "../Img/naver.png";

interface loginDataInput {
  Email: string;
  password: string;
}

const Login: NextPage<{ onChange: () => void }> = (props) => {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const userEmailChangeHandler = (e: any) => {
    setuserEmail(e.target.value);
  };

  const passwordChangeHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    if (userEmail != "" && userPassword != "") {
      const loginData = {
        Email: userEmail,
        password: userPassword,
      };
      loginHandler(loginData);
    } else {
      //경고메시지 생성
    }
  };

  const loginHandler = (loginData: loginDataInput) => {
    axios
      .post(
        "http://3.39.152.5:8080/login",
        {
          username: loginData.Email,
          password: loginData.password,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log("Error!");
      });
  };

  return (
    <>
      <div className="login_background">
        <div className="form_div">
          <div>
            <div className="logodiv">
              <Image
                src={logo}
                alt="Booklog logo"
                objectFit="contain"
                width="300px"
                height="58px"
              />
            </div>
            <form onSubmit={onSubmitHandler}>
              <input
                className="text_box"
                type="userEmail"
                placeholder="이메일 주소"
                onChange={userEmailChangeHandler}
              ></input>
              <br />
              <input
                className="text_box"
                type="password"
                placeholder="비밀번호"
                onChange={passwordChangeHandler}
              ></input>
              <br />
              <input id="userEmail-save" type="checkbox"></input>
              <label className="emailsave" htmlFor="userEmail-save">
                이메일 저장
              </label>
              <br />
              <button className="loginBtn" onClick={() => onSubmitHandler}>
                로그인
              </button>
            </form>
            <div className="login">
              <p className="other_login">다른 서비스 계정으로 로그인</p>
              <div className="googleBtn">
                <Image
                  className="img"
                  src={google}
                  objectFit="contain"
                  width="25px"
                ></Image>
                <div className="btntext">구글 계정으로 로그인</div>
              </div>
              <div className="kakaoBtn">
                <Image
                  className="img"
                  src={kakao}
                  objectFit="contain"
                  width="25px"
                ></Image>
                <div className="btntext">카카오 계정으로 로그인</div>
              </div>
              <div className="naverBtn">
                <Image
                  className="img"
                  src={naver}
                  objectFit="contain"
                  width="25px"
                ></Image>
                <div className="btntext">네이버 계정으로 로그인</div>
              </div>
            </div>

            <hr />
          </div>
          <div className="others">
            <div className="otherBtn">비밀번호 재설정</div>
            <div className="otherBtn">
              <a onClick={props.onChange}>회원 가입</a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .login_background {
          width: 500px;
          margin: 0px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logodiv {
          width: 100%;
          text-align: center;
          margin-bottom: 40px;
        }

        .form_div {
          background-color: white;
          box-sizing: border-box;
          width: 80%;
          height: 100%;
        }
        .text_box {
          width: 97%;
          height: 25px;
          margin-bottom: 10px;
          padding-left: 5px;
        }
        .emailsave {
          font-size: 13px;
        }

        .login {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loginBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #324a86;
          color: white;
          border: 0px;
          border-radius: 5px;
          width: 100%;
          height: 45px;
          margin: 10px 0px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }

        .googleBtn {
          width: 70%;
          background-color: #ececec;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          margin-bottom: 10px;
          font-size: 13px;
          cursor: pointer;
        }
        .kakaoBtn {
          width: 70%;
          background-color: #f4df4b;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          margin-bottom: 10px;
          font-size: 13px;
          cursor: pointer;
        }
        .naverBtn {
          width: 70%;
          background-color: #30c71f;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          font-size: 13px;
          cursor: pointer;
        }
        .btntext {
          width: 80%;
          height: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          border-left: 1px solid white;
        }

        .others {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
        }

        hr {
          margin: 20px 0;
        }
        .other_login {
          font-size: 20px;
          font-weight: 600;
        }

        .otherBtn {
          width: 48%;
          height: 45px;

          display: flex;
          align-items: center;
          justify-content: center;

          background-color: #b9c4e0;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 5px;
        }
        Link {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </>
  );
};

export default Login;