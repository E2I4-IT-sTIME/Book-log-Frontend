import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TitleBox from "./TitleBox";
import ImgBox from "./ImgBox";
import CalendarBox from "./CalendarBox";
import NoticeBox from "./NoticeBox";
import Router from "next/router";
import Image from "next/image";
import notice from "../Img/notice.png";

interface isAdminProps {
  isAdmin: boolean;
  clubId: number;
}

interface clubInfo {
  name: string;
  id: number;
  dates: Array<string>;
  image: string;
  info: string;
  max_num: number;
  cur_num: number;
  ment: string;
  notice: string;
  onoff: boolean;
  tags: Array<string>;
}

export default function Board(props: isAdminProps) {
  const { isAdmin, clubId } = props;
  const router = Router;

  const [detail, setDetail] = useState<clubInfo>();
  const getClubDetailInfo = () => {
    axios
      .get(`http://15.164.193.190:8080/meetings/${clubId}`)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("예상치 못한 에러가 발생했습니다.");
        router.back();
      });
  };

  useEffect(() => {
    getClubDetailInfo();
  }, []);

  const noticeRef = useRef<HTMLDivElement>(null);
  const moveToNotice = () => {
    noticeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {detail ? (
        <div className="container">
          <div className="move-button" onClick={() => moveToNotice()}>
            <Image src={notice} width={30} height={30} />
          </div>
          <div className="first-box">
            <TitleBox
              isAdmin={isAdmin}
              id={detail.id}
              name={detail.name}
              info={detail.info}
              tags={detail.tags}
              stamps={detail.dates.length}
              onoff={detail.onoff}
            />
            <ImgBox image={detail.image} />
          </div>

          <CalendarBox id={detail.id} dates={detail.dates} />
          <div ref={noticeRef}>
            <NoticeBox isAdmin={isAdmin} id={detail.id} />
          </div>
          <div className="ment-box">
            <span className="ment">{detail.ment}</span>
            <span className="name">{detail.name}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 100px 0px 300px 0px;
          gap: 200px;
          position: relative;
        }
        .move-button {
          position: fixed;
          top: 100px;
          right: 50px;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          background-color: #6b86c9;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.2),
            0 3px 10px -3px rgba(0, 0, 0, 0.25),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
          transition: all 0.25s;
        }
        .move-button:hover {
          transform: scale(1.1);
        }
        .first-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
        }
        .ment-box {
          display: flex;
          flex-direction: column;
          align-items: end;
          position: absolute;
          bottom: 40px;
          right: 40px;
        }
        .ment {
          font-size: 18px;
          color: #324a86;
          font-weight: 600;
        }
        .name {
          font-size: 16px;
          color: #324a86;
          font-weight: 550;
        }
      `}</style>
    </>
  );
}
