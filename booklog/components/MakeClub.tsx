import Image from "next/image";
import no_img from "./Img/book_title_no.png";
import { useState, useEffect } from "react";
import { ComponentProps, DOMAttributes } from "react";
import MakeClubDown from "./MakeClubDown";

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function MakeClub() {
  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState();
  const [clubName, setClubName] = useState("");
  const [maxPerson, setMax] = useState(1);
  const [onoff, setOnoff] = useState(false);
  const [content, setContent] = useState("");
  const [genres, setGenres] = useState([""]);

  const handleOnChange: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      const theFile = files![0];
      const reader = new FileReader();
      setProfile(value);
      reader.onloadend = (finishedEvent: any) => {
        const {
          target: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const pContent = (value: string) => {
    setContent(value);
  };

  const pGenres = (value: string) => {
    setGenres((prev) => [...prev, value]);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="upper-box">
          <div className="img-box">
            {attachment ? (
              <img src={attachment} className="attachment" />
            ) : (
              <Image src={no_img} />
            )}
            <div className="hover-box">
              <label htmlFor="file">업로드</label>
              <input
                name="file"
                type="file"
                id="file"
                accept="image/*"
                onChange={handleOnChange}
                value={profile}
              />
              <div className="recommand">
                가로세로 1:1 비율의 사진을 권장합니다.
              </div>
            </div>
          </div>
          <div className="title-box">
            <div className="title">독서모임 생성</div>
            <div className="subtitle">
              내가 원하는 독서모임이 없다면, 직접 만들어보세요!
            </div>
            <div className="club-name">
              모임이름
              <input
                type="text"
                placeholder="20자 이내의 멋진 독서 모임 이름을 작성해주세요!"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
              />
            </div>
            <div className="add-info">
              <div className="max-num">
                최대인원
                <div className="btns">
                  <button
                    onClick={() =>
                      setMax((prev: number) => {
                        if (prev > 1) return prev - 1;
                        return prev;
                      })
                    }
                  >
                    -
                  </button>
                  {maxPerson}
                  <button
                    onClick={() =>
                      setMax((prev: number) => {
                        if (prev < 30) return prev + 1;
                        else return prev;
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="onoff-box">
                <label className="switch-button">
                  <input
                    type="checkbox"
                    onChange={(e) => setOnoff(e.target.checked)}
                  />
                  <span className="onoff-switch"></span>
                </label>
                {onoff ? (
                  <div className="on">온라인 모임</div>
                ) : (
                  <div className="off">오프라인 모임</div>
                )}
              </div>
            </div>
          </div>
          <div className="down-box">
            <MakeClubDown setContent={pContent} setGenres={pGenres} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .body {
          height: 2000px;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .upper-box {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 50px;
          gap: 50px;
          z-index: 1;
          position: relative;
        }
        .img-box {
          display: flex;
          justify-content: center;
          align-items: center;
          object-fit: cover;
          overflow: hidden;
          width: 350px;
          height: 350px;
          border-radius: 100px;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
            0 8px 16px -8px rgba(0, 0, 0, 0.3),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
          position: relative;
        }
        .attachment {
          max-width: 100%;
          min-width: 350px;
          height: auto;
          display: block;
        }
        .hover-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          width: 350px;
          height: 350px;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          border-radius: 100px;
          border: 2px solid rgba(255, 255, 255, 0.18);
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          transition: opacity 0.25s linear;
        }
        .img-box:hover .hover-box {
          opacity: 1;
        }
        .recommand {
          font-size: 20px;
          letter-spacing: -0.2;
          font-weight: 500;
          color: white;
        }
        input[type="file"] {
          /* 파일 필드 숨기기 */
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .hover-box label {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 40px;
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
          cursor: pointer;
        }

        .hover-box label:hover {
          background-color: #324a86;
          color: white;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 40px;
        }
        .title {
          color: #324a86;
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: -0.05;
        }
        .subtitle {
          color: #324a86;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.05;
          padding-left: 3px;
        }
        .down-box {
          width: 90%;
          height: 500px;
          background-color: #e3ebff;
          border-radius: 100px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          z-index: -1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -10%);
        }
        .club-name {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 1.5rem;
          padding-left: 3px;
        }
        .club-name input {
          border-radius: 0.5em;
          height: 30px;
          border: 0.5px solid black;
          padding-left: 10px;
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
        .add-info {
          display: flex;
          flex-direction: row;
          gap: 30px;
          align-items: end;
          font-size: 1.5rem;
        }
        .max-num {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 10px;
        }
        .onoff-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }
        .btns {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 5px;
          align-items: center;
          font-size: 1.3rem;
          background-color: white;
          padding: 8px;
          border-radius: 10px;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
            0 8px 16px -8px rgba(0, 0, 0, 0.3),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
        }
        .btns button {
          border: none;
          border-radius: 1rem;
          background-color: #324a86;
          color: white;
          font-size: 1.5rem;
          width: 25px;
          height: 25px;
          text-align: center;
          align-items: top;
        }
      `}</style>
    </div>
  );
}
