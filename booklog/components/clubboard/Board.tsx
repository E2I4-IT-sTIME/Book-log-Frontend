import { useState, useEffect, Dispatch, SetStateAction } from "react";
import NoticeBox from "../clubboard/NoticeBox";
import CalendarBox from "../clubboard/CalendarBox";
import TitleBox from "../clubboard/TitleBox";
import CalendarDetail from "../clubboard/CalendarDetail";

interface clubIndexProps {
  clubId: number;
}

interface ClubInfo {
  name: string;
  img: string;
  onoff: boolean;
  max_num: number;
  cur_num: number;
  tag: Array<string>;
  content: string;
  notice: string;
  memberList: Array<string>;
}

interface calendarData {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  content: string;
  check: boolean;
}

//더미 데이터
const info: ClubInfo = {
  name: "저 요즘은 LUCY가 좋더라구요...",
  img: "",
  onoff: false,
  max_num: 5,
  cur_num: 3,
  tag: ["루며들다", "떼굴떼굴", "조깅", "개좋아"],
  content: "아니 루시 진짜 개오바에요\n노래들어주세요 제발",
  notice:
    "그대 멀리 떠난다면홀로 어딜 가고 싶은가요\n그 한숨 돌릴 새도 없이 또 내 세상은 빙글빙글 돌아가 반대로\n내가 가고 싶은 대로만 간다면 그저 틀린 길만 나올까\n오늘도 우린 쉬지 않고 달렸잖아 마라톤 하듯이",
  memberList: ["이준규", "한채연", "김은아"],
};

export default function Board(props: clubIndexProps) {
  const { clubId } = props;
  //통신으로 해당 공지 전문과 댓글 받아옴

  const [date, setDate] = useState(new Date());
  const [calendarContent, setCalendarContent] = useState("");
  const [calendarCheck, setCalendarCheck] = useState(false);

  useEffect(() => {
    //날짜에 따라 데이터
    setCalendarContent(`${date}`);
  }, [date]);

  return (
    <div className="container">
      <div className="upper-box">
        <TitleBox
          name={info.name}
          onoff={info.onoff}
          content={info.content}
          tag={info.tag}
        />
      </div>
      <div className="down-box">
        <div className="left-box">
          <CalendarBox date={date} setDate={setDate} />
          <NoticeBox notice={info.notice} />
        </div>
        <div className="right-box">
          <CalendarDetail
            date={`${date}`}
            content={calendarContent}
            check={calendarCheck}
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 50px;
        }
        .down-box {
          padding-top: 50px;
          display: flex;
          flex-direction: row;
          gap: 20px;
          justify-content: center;
        }
        .left-box {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
      `}</style>
    </div>
  );
}
