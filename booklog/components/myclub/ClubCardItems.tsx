import { useState, useEffect } from "react";
import Router from "next/router";

interface clubInfo {
  id: number;
  img: string;
  title: string;
  onoff: boolean;
  maxNum: number;
  curNum: number;
  subtitle: string;
  tag: Array<string>;
  deleteState: boolean;
  deleteFunction: (ind: number) => void;
  index: number;
}

export default function ClubCaredItems(props: clubInfo) {
  const {
    id,
    img,
    title,
    onoff,
    maxNum,
    curNum,
    subtitle,
    tag,
    deleteState,
    deleteFunction,
    index,
  } = props;
  const router = Router;

  const deleteClub = () => {
    if (
      confirm(
        `정말 <${title}> 모임을 탈퇴하시겠습니까?\n모임 탈퇴를 번복할 수 없습니다.`
      )
    ) {
      //탏퇴하는 api 통신
      //성공한다면
      deleteFunction(index);
    }
  };

  const onClickBody = () => {
    router.push({
      pathname: `meeting/${id}`,
    });
  };

  return (
    <div className="container" onClick={() => onClickBody()}>
      {deleteState ? (
        <button className="delete-box" onClick={() => deleteClub()}>
          X
        </button>
      ) : (
        <></>
      )}
      <div className="inner-box">
        <div className="tag-box">
          {tag.map((t) => (
            <span className="tag">#{t}</span>
          ))}
        </div>
        <div className="info-box">
          <div className="prev-box">
            <span className="title">{title}</span>
            <span className="info">
              {onoff ? "온라인 모임" : "오프라인 모임"} | {curNum}/{maxNum}
            </span>
          </div>
          <span className="subtitle">{subtitle}</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          background-color: #e5e5e5;
          border-radius: 1.5em;
          width: 100%;
          height: 100%;
          background-image: url(${img});
          background-size: cover;
          background-position: 50%;
          position: relative;
          overflow: hidden;
          transition: all 1s;
          cursor: pointer;
        }
        .delete-box {
          background-color: black;
          color: white;
          font-weight: 600;
          font-size: 14px;
          position: absolute;
          top: 5%;
          right: 5%;
          padding: 5px 8px 5px 8px;
          border-radius: 100%;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          z-index: 10;
          cursor: pointer;
          transition: all 0.15s;
        }
        .delete-box:hover {
          transform: scale(1.2);
        }
        .inner-box {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100px;
          position: absolute;
          bottom: 0%;
          transition: all 0.5s;
        }
        .container:hover .inner-box {
          height: 100%;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .info-box {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: white;
          transition: all 0.5s;
        }
        .container:hover .info-box {
          justify-content: start;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .subtitle {
          opacity: 0;
          transition: all 0.5s;
          padding: 5px 20px 15px 20px;
          white-space: pre-line;
        }
        .container:hover .subtitle {
          opacity: 1;
        }
        .tag-box {
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 10px 0px 0px 10px;
        }
        .tag {
          background-color: #324a86;
          color: white;
          padding: 5px 10px 5px 10px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          font-size: 14px;
        }
        .prev-box {
          display: flex;
          flex-direction: row;
          margin-top: 12px;
          justify-content: center;
          align-items: center;
          gap: 15px;
        }
        .title {
          font-weight: 600;
          font-size: 20px;
          background-color: white;
          border-radius: 5px;
          letter-spacing: -0.05;
          padding: 2px 5px 2px 5px;
        }
      `}</style>
    </div>
  );
}
