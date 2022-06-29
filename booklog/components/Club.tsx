import ClubPrev from "./ClubPrev";
import { useState, useEffect } from "react";

export default function Club() {
  const tmp = ["추리", "판타지"];

  const [checked, setChecked] = useState(false);
  const [onoff, setOnoff] = useState("오프라인 모임");
  const onoffHandler = (checked: boolean) => {
    setChecked(checked);
  };

  useEffect(() => {
    if (checked) setOnoff("온라인 모임");
    else setOnoff("오프라인 모임");
  }, [checked]);

  const club = {
    img: "https://image.ajunews.com/content/image/2020/06/25/20200625170136679538.png",
    title: "유아인 어쩌고",
    onoff: false,
    maxNum: 2,
    curNum: 1,
    subtitle:
      "유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다",
    tag: tmp,
  };

  const clubArray = [club, club, club, club, club, club, club];
  return (
    <>
      <div className="container">
        <div className="first-box">
          <div className="title">
            나에게 딱 맞는 독서모임
            <br />
            모두 BookLog에서
          </div>
          <div className="first-inner-box">
            <form className="search-box">
              <input type="text" placeholder="모임명을 입력해주세요"></input>
              <button>🔍</button>
            </form>
            <button className="btns">내 모임</button>
            <button className="btns">모임 만들기</button>
          </div>
        </div>
        <hr />
        <div className="second-box">
          <label className="switch-button">
            <input
              type="checkbox"
              onChange={(e) => onoffHandler(e.target.checked)}
            />
            <span className="onoff-switch"></span>
          </label>
          {checked ? (
            <div className="on">{onoff}</div>
          ) : (
            <div className="off">{onoff}</div>
          )}
        </div>
        <div className="third-box-cover">
          <div className="third-box">
            {checked
              ? clubArray
                  .filter((club: any) => club.onoff)
                  .map((club: any) => (
                    <ClubPrev
                      img={club.img}
                      title={club.title}
                      onoff={club.onoff}
                      maxNum={club.maxNum}
                      curNum={club.curNum}
                      subtitle={club.subtitle}
                      tag={club.tag}
                    />
                  ))
              : clubArray
                  .filter((club: any) => !club.onoff)
                  .map((club: any) => (
                    <ClubPrev
                      img={club.img}
                      title={club.title}
                      onoff={club.onoff}
                      maxNum={club.maxNum}
                      curNum={club.curNum}
                      subtitle={club.subtitle}
                      tag={club.tag}
                    />
                  ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .first-box {
          padding: 50px 5% 20px 5%;
        }
        .title {
          color: #324a86;
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: -0.05;
        }
        .first-inner-box {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          gap: 20px;
        }

        .search-box {
          padding: 5px;
          width: 500px;
          background-color: white;
          border-radius: 0.5em;
          display: flex;
          justify-content: space-around;
          border: 1px solid #000;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }

        .search-box input {
          border: none;
          width: 80%;
          height: 25px;
        }
        .search-box button {
          border: none;
          background: none;
          font-size: 1.1rem;
          transition: 0.3s;
        }
        .search-box button:hover {
          transform: scale(1.2);
        }

        .btns {
          padding: 0px 20px 0px 20px;
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
        }

        .btns:hover {
          border: 2px solid white;
          background-color: #324a86;
          color: white;
        }

        hr {
          width: 90%;
        }

        .second-box {
          padding: 10px 5% 0px 5%;
          display: flex;
          flex-direction: row;
          gap: 10px;
          align-items: center;
        }

        .on {
          color: #324a86;
          font-size: 1rem;
          font-weight: bold;
        }

        .off {
          color: #5e5e5e;
          font-size: 1rem;
          font-weight: bold;
        }

        .switch-button {
          position: relative;
          display: inline-block;
          width: 45px;
          height: 25px;
        }

        .switch-button input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .onoff-switch {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          background-color: #ccc;
          box-shadow: inset 1px 5px 1px #999;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .onoff-switch:before {
          position: absolute;
          content: "";
          height: 17px;
          width: 17px;
          left: 4px;
          bottom: 4px;
          background-color: #fff;
          -webkit-transition: 0.5s;
          transition: 0.4s;
          border-radius: 20px;
        }

        .switch-button input:checked + .onoff-switch {
          background-color: #324a86;
          box-shadow: inset 1px 5px 1px #324a86;
        }

        .switch-button input:checked + .onoff-switch:before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
        .third-box-cover {
          padding: 20px 0px 60px 4%;
        }

        .third-box {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 50px;
        }

        button {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
