import Card from "./UI/Card";
import { useState, useEffect } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState("");

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

  return (
    <Card>
      <div>북로그 회원 가입</div>
      <div>하나의 아이디로 북로그의 다양한 서비스를 이용해보세요</div>
      <form>
        <input
          type="text"
          name="first"
          placeholder="성"
          value={first}
          onChange={inputHandler}
        ></input>
        <input
          type="text"
          name="last"
          placeholder="이름"
          value={last}
          onChange={inputHandler}
        ></input>
        <br />
        <input
          type="email"
          name="email"
          placeholder="이메일 주소"
          value={email}
          onChange={inputHandler}
        ></input>
        <br />
        <input
          type="password"
          name="pwd"
          placeholder="비밀번호"
          value={password}
          onChange={inputHandler}
        ></input>
        <br />
        <input
          type="password"
          name="check"
          placeholder="비밀번호 확인"
          value={checkPwd}
          onChange={inputHandler}
        ></input>
        <br />
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
        <br />
        <button>가입하기</button>
        <p>다른 서비스 계정으로 가입</p>
        <button>구글 계정으로 가입</button>
        <br />
        <button>카카오 계정으로 가입</button>
        <br />
        <button>네이버 계정으로 가입</button>
      </form>
    </Card>
  );
}
