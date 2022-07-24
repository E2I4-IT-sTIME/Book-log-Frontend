import logo_color from "../Img/logo_color.png";
import Image from "next/image";

export default function CompleteJoin() {
  return (
    <div className="container">
      <div className="box">
        <div className="logo">
          <Image src={logo_color} />
        </div>
        <div className="title">
          독서모임 가입신청이 완료되었어요!
          <br />
          북로그는 당신의 열정을 응원합니다.
        </div>
      </div>
      <button>내 모임</button>
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
