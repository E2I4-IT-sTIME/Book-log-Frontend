import { useState, useEffect } from "react";

interface clubInfo {
  img: string;
  title: string;
  onoff: boolean;
  maxNum: number;
  curNum: number;
  subtitle: string;
  tag: Array<string>;
}

export default function ClubCaredItems(props: clubInfo) {
  const { img, title, onoff, maxNum, curNum, subtitle, tag } = props;

  return (
    <div className="container">
      <div className="inner-box">
        <div className="tag-box">
          {tag.map((t) => (
            <span className="tag">{t}</span>
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
          width: 500px;
          height: 400px;
          background-image: url(${img});
          background-size: cover;
          background-position: 50%;
          position: relative;
          overflow: hidden;
        }
        .inner-box {
          position: absolute;
          bottom: 0%;
          width:100%;
          transition: all 0.25s linear;
        }
        .info-box {
          width: 100%;
          background: rgba(255, 255, 255, 0.55);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(3.5px);
          -webkit-backdrop-filter: blur(3.5px);
          padding: 20px;
          transition: all 0.25s linear;
        }
        .subtitle {
          display: none;
        }
        .container:hover .inner-box {
          height: 100%;
          position: relative;
        }
        .container:hover .info-box {
          height: 100%;
        }
        .container:hover .tag-box {
          position: absolute;
          top: 0%;
          left: 0%;
        }
      `}</style>
    </div>
  );
}
