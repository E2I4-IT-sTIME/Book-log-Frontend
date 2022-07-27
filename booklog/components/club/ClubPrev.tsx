import tmp from "./Img/frog.png";
import { useState, useEffect } from "react";
import Router from "next/router";

interface ClubInfo {
  id: number;
  img: string;
  title: string;
  onoff: boolean;
  maxNum: number;
  curNum: number;
  subtitle: string;
  tag: Array<string>;
}

export default function ClubPrev(props: ClubInfo) {
  const { id, img, title, onoff, maxNum, curNum, subtitle, tag } = props;
  const router = Router;
  const [onoffTag, setonoff] = useState("");
  const [clubTitle, setTitle] = useState(title);
  const [clubSubtitle, setSubtitle] = useState(subtitle);
  useEffect(() => {
    if (onoff) setonoff(`온라인 모임 | ${curNum}/${maxNum}`);
    else setonoff(`오프라인 모임 | ${curNum}/${maxNum}`);

    if (title.length > 20) setTitle(`${title.substring(0, 20)}...`);

    if (subtitle.length > 80) setSubtitle(`${subtitle.substring(0, 40)}...`);
  }, []);

  const onClickBody = () => {
    router.push({
      pathname: `meeting/${id}`,
    });
  };

  return (
    <div className="container" onClick={() => onClickBody()}>
      <div className="prev-box">
        <img src={img} alt={title} className="club-img" />
        <div className="info-box">
          <span className="title">{clubTitle}</span>
          <span className="onoff">{onoffTag}</span>
          <p className="subtitle">{clubSubtitle}</p>
          <div className="tag-box">
            {tag.map((tag: string, index) => (
              <div key={index} className="tag">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="hover-box">
          <button className="club-btn">해당 클럽 상세보기</button>
        </div>
      </div>

      <style jsx>{`
        .prev-box {
          width: 390px;
          min-height: 180px;
          background-color: #e5e5e5;
          padding: 30px;
          border-radius: 0.5rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          position: relative;
        }
        .club-img {
          width: 200px;
          height: 200px;
          object-fit: cover;
        }
        .info-box {
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 24px;
          font-weight: 900;
        }
        .onoff {
          padding-top: 10px;
          font-size: 16px;
          color: #324a86;
        }
        .subtitle {
          line-height: 22px;
        }
        .tag-box {
          display: flex;
          flex-direction: row;
          gap: 10px;
          flex-wrap: wrap;
        }
        .tag {
          background-color: white;
          padding: 10px;
          border-radius: 0.5rem;
          font-weight: bold;
          color: #324a86;
        }
        .hover-box {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          transition: opacity 0.25s linear;
        }
        .club-btn {
          padding: 0px 20px 0px 20px;
          height: 50px;
          border-radius: 0.5rem;
          border: 2px solid #324a86;
          background-color: #00ff0000;
          color: #324a86;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
        }
        .club-btn:hover {
          background-color: #324a86;
          color: white;
        }
        .prev-box:hover .hover-box {
          opacity: 1;
        }
        button {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
