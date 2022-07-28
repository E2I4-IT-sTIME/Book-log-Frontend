import logo_color from "../Img/logo_color.png";
import Image from "next/image";
import Link from "next/link";

export default function WaitAccept() {
  return (
    <div className="container">
      <div className="box">
        <div className="logo">
          <Image src={logo_color} />
        </div>
        <div className="title">
          아직 가입 승인이 완료되지 않았어요.
          <br />
          모임장의 승인을 조금만 기다려주세요!
        </div>
      </div>
      <Link href="/meeting">
        <a>
          <button>돌아가기</button>
        </a>
      </Link>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          height: 550px;
        }
        .box {
          position: relative;
        }
        .title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 32px;
          text-align: center;
          line-height: 40px;
          font-weight: bold;
          background-color: #324a86;
          color: white;
          padding: 10px 20px 10px 20px;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .logo {
          opacity: 0.3;
        }

        button {
          padding: 10px 25px 10px 25px;
          border-radius: 0.5rem;
          border: 2px solid #324a86;
          background-color: white;
          color: #324a86;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
          cursor: pointer;
        }

        button:hover {
          border: 2px solid white;
          background-color: #324a86;
          color: white;
        }
      `}</style>
    </div>
  );
}
