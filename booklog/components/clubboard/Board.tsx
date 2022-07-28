import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import TitleBox from "./TitleBox";
import ImgBox from "./ImgBox";
import CalendarBox from "./CalendarBox";
import NoticeBox from "./NoticeBox";
import Router from "next/router";

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

  return (
    <>
      {detail ? (
        <>
          <TitleBox
            isAdmin={isAdmin}
            id={detail.id}
            name={detail.name}
            info={detail.info}
            tags={detail.tags}
            stamps={detail.dates.length} //수정해야함
          />
          <ImgBox image={detail.image} />
          <CalendarBox id={detail.id} dates={detail.dates} />
          <NoticeBox isAdmin={isAdmin} id={detail.id} />
          <div>
            <span>{detail.ment}</span>
            <span>{detail.name}</span>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
