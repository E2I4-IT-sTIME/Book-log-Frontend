import { useState, useEffect } from "react";
import ClubInfo from "../../components/club/ClubInfo";

interface clubInfoProps {
  clubId: number;
}

export default function NoMember(props: clubInfoProps) {
  //모임 아이디로 모임 정보 받아와야함
  const { clubId } = props;

  //임시 모임 정보
  const tmp = ["추리", "판타지"];
  const tmpClubInfo = {
    img: "https://photo.jtbc.joins.com/news/2020/06/06/202006061520254167.jpg",
    title: "유아인 어쩌고",
    onoff: false,
    maxNum: 2,
    curNum: 1,
    subtitle:
      "유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다",
    tag: tmp,
  };
  const { img, title, onoff, maxNum, curNum, subtitle, tag } = tmpClubInfo;
  const tmpQuestion = [
    "가장 좋아하는 책은 뭔가요?",
    "가장 싫어하는 책은 뭔가요?",
  ];
  const tmpWelcome = "어서오세요 언넝 가입하세요ㅎㅎ";

  return (
    <div className="container">
      <div>
        <ClubInfo
          name={title}
          img={img}
          onoff={onoff}
          max_num={maxNum}
          cur_num={curNum}
          tag={tag}
          content={subtitle}
          welcome={tmpWelcome}
          question={tmpQuestion}
        />
      </div>
      <style jsx>{`
        .container {
          white-space: pre-line;
        }
        .img-box {
          width: 400px;
          height: 500px;
          background-image: url(${tmpClubInfo.img});
          background-size: cover;
          background-position: 50%;
        }
      `}</style>
    </div>
  );
}
