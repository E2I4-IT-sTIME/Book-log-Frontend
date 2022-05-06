import Image from "next/image";
import Card from "./UI/Card";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Button from "./UI/Button";

const Signup: NextPage<{ onChange: () => void }> = (props) => {
  const [name, setName] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [isEqualPwd, setIsEqualPwd] = useState(false);

  const inputHandler = (e: any) => {
    const type = e.target.name;
    const value = e.target.value;
    switch (type) {
      case "first":
        setFirst(value);
        setName(first + last);
        break;
      case "last":
        setLast(value);
        setName(first + last);
        break;
      case "email":
        setEmail(value);
        break;
      case "pwd":
        setPassword(value);
        break;
      case "check":
        setCheckPwd(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  const passwordHandler = () =>{
    if(password === checkPwd) {
      setIsEqualPwd(true);
    }
  }

  const signUpHandler = (e:any) => {
    e.preventDefault();
    return;
    if(name != "" && email != "" && password != "" && isEqualPwd === true){
      axios
        .post(
          "url",
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
    }else{
      // 경고메시지 출력
    }
    
  };

  return (
    <Card>
      <div className="main_text">북로그 회원 가입</div>
      <div className="sub_text">
        하나의 아이디로 북로그의 다양한 서비스를 이용해보세요
      </div>
      <form onSubmit={signUpHandler}>
        <div className="name_box">
          <input
            className="text_box_small"
            type="text"
            name="first"
            placeholder="성"
            value={first}
            onChange={inputHandler}
          ></input>
          <input
            className="text_box_small"
            type="text"
            name="last"
            placeholder="이름"
            value={last}
            onChange={inputHandler}
          ></input>
        </div>
        <div className="other_box">
          <input
            className="text_box"
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={email}
            onChange={inputHandler}
          ></input>
          <br />
          <input
            className="text_box"
            type="password"
            name="pwd"
            placeholder="비밀번호"
            value={password}
            onChange={inputHandler}
          ></input>
          <br />
          <input
            className="text_box"
            type="password"
            name="check"
            placeholder="비밀번호 확인"
            value={checkPwd}
            onChange={inputHandler}
          ></input>
        </div>

        <div className="check_box">
          <input id="email-check" type="checkbox"></input>
          <label htmlFor="email-check">
            북로그 서비스에 대한 소식을 이메일로 받아봅니다
          </label>

          <br />
          <input id="service-check" type="checkbox"></input>
          <label htmlFor="service-check">
            북로그에서 제공하는 서비스 약관에 동의합니다.
          </label>
          <button>약관보기</button>
        </div>

        <Button>가입하기</Button>
        <div className="other_signup">
          <p>다른 서비스 계정으로 가입</p>
          <button>구글 계정으로 가입</button>
          <button>카카오 계정으로 가입</button>
          <button>네이버 계정으로 가입</button>
        </div>
      </form>
      <div>
        <a onClick={props.onChange}>로그인 화면으로 돌아가기</a>
      </div>
      <style jsx>{`
        .main_text {
          font: 20px bold;
          margin: 10px 0;
        }
        .sub_text {
          font: 15px;
          margin: 10px 0;
        }
        .name_box {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .text_box_small {
          width: 47%;
          height: 25px;
          margin-bottom: 10px;
        }
        .text_box {
          width: 100%;
          height: 25px;
          margin-bottom: 10px;
        }
        .other_signup {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .other_signup button {
          width: 50%;
          height: 30px;
          color: black;
          margin-bottom: 5px;
        }
      `}</style>
    </Card>
  );
};


export default Signup;