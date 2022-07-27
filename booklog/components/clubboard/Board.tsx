import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Router from "next/router";
import axios from "axios";
import TitleBox from "./TitleBox";
import ImgBox from "./ImgBox";
import CalendarBox from "./CalendarBox";

interface clubInfo {
  name: string;
  id: number;
  email: string;
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

export default function Board() {
  const router = Router;
  const clubId = Number(`${router.query.params}`);

  const [detail, setDetail] = useState<clubInfo>();
  const getClubDetailInfo = () => {
    axios
      .get(`http://15.164.193.190:8080/auth/meetings/${clubId}`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
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
            id={detail.id}
            email={detail.email}
            name={detail.name}
            info={detail.info}
            tags={detail.tags}
            stamps={detail.dates.length} //수정해야함
          />
          <ImgBox image={detail.image} />
          <CalendarBox />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
