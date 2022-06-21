import Image from "next/image";
import Card from "./UI/Card";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Button from "./UI/Button";

interface loginDataInput {
  Email: string;
  password: string;
}

const Login: NextPage<{ onChange: () => void }> = (props) => {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [saveuserEmail, setSaveuserEmail] = useState(false);

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
        "url",
        {
          username: "euna",
          password: "1234",
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
  };

  return (
    <>
      <Card>
        <div className="form_div">
          <div>
            <Image
              src="/vercel.svg"
              alt="Booklog logo"
              width="200px"
              height="50px"
            />
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
              <label htmlFor="userEmail-save">이메일 저장</label>
              <br />
              <button onClick={() => loginHandler}>로그인</button>
            </form>
            <p>다른 서비스 계정으로 로그인</p>
            <button>구글 계정으로 로그인</button>
            <br />
            <button>카카오 계정으로 로그인</button>
            <br />
            <button>네이버 계정으로 로그인</button>
            <hr />
          </div>
          <div>
            <Link href="/">
              <a>비밀번호 재설정</a>
            </Link>{" "}
            <br />
            <a onClick={props.onChange}>회원 가입</a>
          </div>
        </div>
      </Card>
      <style jsx>{`
        .form_div {
          background-color: white;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 10%;
        }
        .text_box {
          width: 100%;
          height: 25px;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default Login;
