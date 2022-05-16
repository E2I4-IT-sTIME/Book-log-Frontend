import Image from "next/image";
import { useState, useEffect } from "react";

interface bookInfo {
  rank: number;
  imgSrc: string; //책 표지
  bookTitle: string; //책 제목
  author: string; //저자
}

export default function BookInfoPrev(props: bookInfo) {
  const { rank, imgSrc, bookTitle, author } = props;
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (bookTitle.length > 6) {
      setTitle(`${bookTitle.substring(0, 6)}…`);
    } else {
      setTitle(bookTitle);
    }
  }, []);
  return (
    <>
      <div className="container">
        <span className="rank">{rank}위</span>
        <img src={imgSrc} />
        <span className="title">{title}</span>
        <span className="author">{author}</span>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }

        .container img {
          width: 100px;
        }

        .rank {
          font-weight: bold;
          padding-bottom: 3px;
        }

        .title {
          padding: 3px 0px 3px 0px;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .author {
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}
