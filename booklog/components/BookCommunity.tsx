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
    <div className="container">
      <div className="explain">책 검색하고, 작성된 서평을 만나보세요!</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="책 제목"
          onChange={onInputHandler}
        ></input>
        <button onClick={onSearchHandler}>검색</button>
      </form>
      <div>
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
          flex-direction: column;
          text-align: center;
          padding-top: 20px;
          gap: 30px;
        }
        .explain {
          color: white;
          font-size: 1.5rem;
          letter-spacing: -0.05rem;
        }
      `}</style>
    </div>
  );
}
