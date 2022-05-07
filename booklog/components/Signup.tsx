import Card from "./UI/Card";
import { useState, useEffect } from "react";
import AddInfor from "./AddInfor";

export default function Signup() {
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

  const submitHandler = (e: any) => {
    e.preventDefault();
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

  return (
    <div>
      <Card>
        <div>북로그 회원 가입</div>
        <div>하나의 아이디로 북로그의 다양한 서비스를 이용해보세요</div>
        <form onSubmit={submitHandler}>
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
          <span>{regularStr}</span>
          <br />
          <input
            type="password"
            name="check"
            placeholder="비밀번호 확인"
            value={checkPwd}
            onChange={inputHandler}
          ></input>
          {check ? null : <span>{error}</span>}
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
          <button onClick={checkPassword}>가입하기</button>
          <p>다른 서비스 계정으로 가입</p>
          <button>구글 계정으로 가입</button>
          <br />
          <button>카카오 계정으로 가입</button>
          <br />
          <button>네이버 계정으로 가입</button>
        </form>
      </Card>
      {ok ? <AddInfor email={email} password={password} /> : null}
    </div>
  );
}
