import Image from "next/image";
import AddInfor from "./AddInfor";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import google from "./Img/google.png";
import kakao from "./Img/kakao.png";
import naver from "./Img/naver.png";

const Signup: NextPage<{ onChange: () => void }> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [check, setCheck] = useState(true); //true면 비밀번호 동일, false면 비밀번호 틀림
  const [error, setError] = useState(""); //에러 문자
  const [regular, setRegular] = useState(false); //비밀번호 정규식 검사
  const [regularStr, setRegularStr] = useState(""); //정규식 검사 결과
  const [ok, setOk] = useState(false);

  const inputHandler = (e: any) => {
    const type = e.target.name;
    const value = e.target.value;
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "pwd":
        setPassword(value);
        regularExpression(value);
        break;
      case "check":
        setCheckPwd(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  const checkPassword = () => {
    if (password != checkPwd) {
      setCheck(false);
      setError("비밀번호가 잘못 입력되었습니다.");
    } else if (password.length < 8) {
      setCheck(false);
      setError("비밀번호는 8자리 이상으로 입력해주세요.");
    } else if (!regular) {
      setCheck(false);
      setError("비밀번호 입력 조건을 확인해주세요.");
    } else {
      setCheck(true);
      setOk(true);
    }
  };

  const regularExpression = (typing: string) => {
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/; //숫자, 영문자 포함 8자 이상
    if (!reg.test(typing)) {
      setRegular(false);
      setRegularStr("숫자/영문자 8자리 이상으로 입력해주세요.");
    } else {
      setRegular(true);
      setRegularStr("안전한 비밀번호입니다😉");
    }
  };
  const signUpHandler = (e: any) => {
    e.preventDefault();
    if (email != "" && password != "") {
      axios
        .post(
          "http://3.39.152.5:8080/join",
          {
            username: name,
            userEmail: email,
            userPwd: password,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log("Error!");
        });
    } else {
      // 경고메시지 출력
    }
  };

  return (
    <>
      <div className="signup_background">
        <div className="main_text">북로그 회원 가입</div>
        <div className="sub_text">
          하나의 아이디로 북로그의 다양한 서비스를 이용해보세요
        </div>
        <div className="name_box">
        <form className="other_box" onSubmit={signUpHandler}>          
          <div>
            <div className="email_div">
              <input
                className="email_box"
                type="email"
                name="email"
                placeholder="이메일 주소"
                value={email}
                onChange={inputHandler}
              ></input>
              <div className="otherBtn">인증번호 전송</div>
            </div>
            <input
              className="text_box"
              type="text"
              name="text"
              placeholder="인증번호"
              value={email}
              onChange={inputHandler}
            ></input>
            <input
              className="text_box"
              type="password"
              name="pwd"
              placeholder="비밀번호"
              value={password}
              onChange={inputHandler}
            ></input>
            {regularStr == "" ? null : <div className="notice">{regularStr}</div>}
            <input
              className="text_box"
              type="password"
              name="check"
              placeholder="비밀번호 확인"
              value={checkPwd}
              onChange={inputHandler}
            ></input>
            {check ? null : <span>{error}</span>}
          </div>

          <div className="check_box">
            <input id="service_check" type="checkbox"></input>
            <label className="service_check" htmlFor="service_check">
              북로그에서 제공하는 서비스 약관에 동의합니다.
            </label>
          </div>
          <div className="signBtn" onClick={checkPassword}>가입하기</div>
          <div className="other_signup">
            <p className="sign">다른 서비스 계정으로 가입</p>
            <div className="googleBtn">
              <Image className="img" src={google} objectFit="contain" width="25px"></Image>
              <div className="btntext">구글 계정으로 가입</div>
            </div>
            <div className="kakaoBtn">
              <Image className="img" src={kakao} objectFit="contain" width="25px"></Image>
              <div className="btntext">카카오 계정으로 가입</div>
            </div>
            <div className="naverBtn">
              <Image className="img" src={naver} objectFit="contain" width="25px"></Image>
              <div className="btntext">네이버 계정으로 가입</div>
            </div>
          </div>        
        </form>
        </div>
        <div className="back">
          <a onClick={props.onChange}>로그인 화면으로 돌아가기</a>
        </div>
        <style jsx>{`
          .signup_background{
            width: 500px;
            margin: 0px auto;
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: center;
          } 
          .main_text {
            text-align:center;
            font-size: 30px;
            font-weight: 600;
            margin: 10px 0;
          }
          .sub_text {
            font-size: 13px;
            margin-bottom: 20px;
          }

          .name_box {
            width: 80%;
            display: flex;
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: center;
          }
          .other_box{
            width: 100%;
          }

          .email_div {
            display:flex;
            flex-direction:row;
            width: 100%;
            margin-bottom:10px;
          }
          .email_box {
            width:70%;
            padding: 0 5px;
          }

          .otherBtn{
          width: 30%;
          height: 35px;         
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #B9C4E0;
          color:white;
          font-size: 13px;
          font-weight: 600;
          cursor:pointer;
          border-radius: 5px;  
          margin-left: 5px;        
        }

          .service_check{
            font-size:13px;
          }

          .notice{
            font-size:13px;
            margin-bottom:10px; 
            width:100%;
          }

          .text_box_small {
            width: 47%;
            height: 25px;
            margin-bottom: 10px;
          }
          .text_box {
            width: 97%;
            height: 30px;
            margin-bottom: 10px;
            padding: 0 5px;
          }
          .sign{
            font-size:20px;
            font-weight:600;
          }

          .signBtn{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #324A86;
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
          .other_signup {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .googleBtn {
          width: 70%;
          background-color: #ECECEC;
          height:40px;
          display:flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          margin-bottom: 10px;
          font-size:13px;
          cursor:pointer;
        }
        .kakaoBtn{
          width: 70%;
          background-color: #F4DF4B;
          height:40px;
          
          display:flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          margin-bottom: 10px;
          font-size:13px;
          cursor:pointer;
        }
        .naverBtn{
          width: 70%;
          background-color: #30C71F;
          height:40px;
          
          display:flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          font-size:13px;
          cursor:pointer;
        }

        .btntext{
          width:80%;
          height:100%;
          text-align:center;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left:8px;
          border-left : 1px solid white;
        }
       
        .others{
          width: 100%;
          display:flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
        }

        .back{
          margin-top:20px;
          font-size:13px;
          font-weight:600;
        }
        `}</style>
      </div>
      {ok ? <AddInfor email={email} password={password} /> : null}
    </>
  );
};

export default Signup;
