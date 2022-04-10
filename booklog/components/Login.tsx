import Image from "next/image";
import Card from "./UI/Card";
import Link from "next/link";
import { NextPage } from "next";


const Login: NextPage<{ onChange: () => void }> = (props) => {
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
            <form>
              <input
                className="text_box"
                type="email"
                placeholder="이메일 주소"
              ></input>
              <br />
              <input
                className="text_box"
                type="password"
                placeholder="비밀번호"
              ></input>
              <br />
              <input id="email-save" type="checkbox"></input>
              <label htmlFor="email-save">이메일 저장</label>
              <br />
              <button className="login_button">로그인</button>
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
        .login_button {
          background-color: #605EC9;
          color: white;
          border: 0px;
          border-radius: 5px;
          width : 100%;
          height: 45px;
          margin: 10px 0px;
        }
      `}</style>
    </>
  );
};

export default Login;