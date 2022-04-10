import Card from "./UI/Card";

export default function Signup(){
  return (
    <Card>
      <div>북로그 회원 가입</div>
      <div>하나의 아이디로 북로그의 다양한 서비스를 이용해보세요</div>
      <form>
        <input type="text" value="성"></input>
        <input type="text" value="이름"></input>
        <br />
        <input type="email" value="이메일 주소"></input>
        <br />
        <input type="password" value="비밀번호"></input>
        <br />
        <input type="password" value="비밀번호 확인"></input>
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