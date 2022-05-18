import axios from "axios";
import { useEffect, useState } from "react";
import BookInfoPrev from "./BookInfoPrev";

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

  return (
    <>
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
        ))}
      </div>
    </>
  );
}
