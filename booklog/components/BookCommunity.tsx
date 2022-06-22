import axios from "axios";
import { useEffect, useState } from "react";
import BookInfoPrev from "./BookInfoPrev";
import { useRouter } from "next/router";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

const kakaoSearch = (params: any) => {
  return Kakao.get("/v3/search/book", { params });
};

export default function BookCommunity() {
  const [books, setBooks] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [rank, setRank] = useState(0);
  const router = useRouter();

  const onInputHandler = (e: any) => {
    setKeywords(e.target.value);
  };

  const onSearchHandler = () => {
    search();
  };

  const search = async () => {
    const searchKey = keywords;
    try {
      if (searchKey === "") {
        setBooks([]);
      } else {
        const params = {
          query: searchKey,
          size: 45,
          target: "title",
        };
        const result = await kakaoSearch(params);

        if (result) {
          setBooks(result.data.documents);
        } else {
          console.log("fail");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onClickBook = (book: any) => {
    router.push({
      pathname: `books/${book.isbn}`,
    });
  };

  return (
    <>
      <div className="container">
        <div className="first-box">
          <div className="explain">책 검색하고, 작성된 서평을 만나보세요!</div>
          <form onSubmit={(e) => e.preventDefault()} className="search-box">
            <input
              type="text"
              placeholder="책 제목"
              onChange={onInputHandler}
            ></input>
            <button onClick={onSearchHandler}>🔍</button>
          </form>
        </div>
      </div>

      <div className="second-box">
        {books.map((book: any) => (
          <div onClick={() => onClickBook(book)} key={book.isbn}>
            <BookInfoPrev
              rank={rank}
              imgSrc={book.thumbnail}
              bookTitle={book.title}
              author={book.authors[0]}
              publisher={book.publisher}
              dateTime={book.datetime}
              content={book.contents}
              url={book.url}
            ></BookInfoPrev>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }

        .first-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 20px;
          gap: 20px;
        }
        .explain {
          color: white;
          font-size: 1.5rem;
          letter-spacing: -0.05rem;
          text-align: center;
        }
        .search-box {
          padding: 5px;
          width: 500px;
          background-color: white;
          border-radius: 0.5em;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
            0 8px 16px -8px rgba(0, 0, 0, 0.3),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
          display: flex;
          justify-content: space-around;
        }

        .search-box input {
          border: none;
          width: 80%;
          height: 25px;
        }
        .search-box button {
          border: none;
          background: none;
          font-size: 1.1rem;
          transition: 0.3s;
        }
        .search-box button:hover {
          transform: scale(1.2);
        }

        .second-box {
          width: 100%;
          margin-top: 50px;
          display: flex;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 3rem;
          column-gap: 6rem;
          padding-bottom: 100px;
        }
      `}</style>
    </>
  );
}
