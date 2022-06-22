import Image from "next/image";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";

interface bookInfo {
  rank: number; //랭킹
  imgSrc: string; //책 표지
  bookTitle: string; //책 제목
  author: string; //저자
  publisher: string; //출판사
  dateTime: string; //발행날짜
  content: string; //미리보기
  url: string; //판매링크
}

export default function BookInfoPrev(props: bookInfo) {
  const { rank, imgSrc, bookTitle, author, publisher, dateTime, content, url } =
    props;
  const [title, setTitle] = useState(""); //책 제목 12글자마다 개행

  useEffect(() => {
    if (bookTitle.length > 22) {
      setTitle(`${bookTitle.substring(0, 22)}…`);
    } else {
      setTitle(bookTitle);
    }
  }, [bookTitle]);

  return (
    <div className="container">
      <div className="box">
        <span className="rank">{rank}위</span>
        <img src={imgSrc} />
        <span className="title">{title}</span>
        <span className="author">{author}</span>
      </div>

      <style jsx>{`
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 1rem;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
            0 8px 16px -8px rgba(0, 0, 0, 0.3),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);

          transition: 0.3s;
        }
        .container:hover {
          transform: scale(1.1);
        }
        .box {
          display: flex;
          flex-direction: column;
        }

        .container img {
          width: 120px;
        }

        .rank {
          font-weight: bold;
          padding-bottom: 3px;
        }

        .title {
          padding: 3px 0px 3px 0px;
          font-size: 1rem;
          font-weight: bold;
          width: 120px;
          letter-spacing: -0.03em;
        }

        .author {
          font-size: 0.9rem;
          width: 120px;
        }
      `}</style>
    </div>
  );
}
