import { useState, useEffect } from "react";
import Image from "next/image";

interface bookInfo {
  imgSrc: string; //책 표지
  bookTitle: string; //책 제목
  author: string; //저자
  repoTitle: string; //서평 제목
  preview: string; //서평 미리보기
  date: string; //서평 작성 날짜
  name: string; //작성자 이름
}

export default function BookRepo(props: bookInfo) {
  const { imgSrc, bookTitle, author, repoTitle, preview, date, name } = props;
  const [prevContent, setContent] = useState("");
  useEffect(() => {
    if (preview.length > 120) {
      setContent(`${preview.substring(0, 119)}...`);
    } else {
      setContent(preview);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="book_item">
          <img src={imgSrc} alt={bookTitle} />
          <div className="author_item">
            <span className="title">{bookTitle}</span>
            <span className="author">{author}</span>
          </div>
        </div>
        <div className="repo_item">
          <span className="repo_title">{repoTitle}</span>
          <p>{prevContent}</p>
          <span>
            {date} | {name}
          </span>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          width: 500px;
          border: 1px solid black;
          padding: 20px;
        }
        .container img {
          width: 100px;
        }
        .book_item {
          padding-right: 20px;
        }
        .author_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 5px;
        }
        .title {
          font-weight: bold;
        }
        .author {
          font-size: 0.8rem;
        }
        .repo_item {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
        .repo_title {
          font-size: 1.8rem;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
