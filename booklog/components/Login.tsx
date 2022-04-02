import Image from "next/image";
import Card from "./UI/Card";
import Link from "next/link";

export default function Login() {
  return (
    <Card>
      <div>
        <Image
          src="/vercel.svg"
          alt="Booklog logo"
          width="200px"
          height="200px"
        />
        <form>
          <input type="email" placeholder="이메일 주소"></input>
          <br />
          <input type="password" placeholder="비밀번호"></input>
          <br />
          <input id="email-save" type="checkbox"></input>
          <label htmlFor="email-save">이메일 저장</label>
          <br />
          <button>로그인</button>
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
        <Link href="/">
          <a>회원 가입</a>
        </Link>
      </div>
    </Card>
  );
}
