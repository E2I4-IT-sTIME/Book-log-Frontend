import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

const kakaoSearch = (params: any) => {
  return Kakao.get("/v3/search/book", { params });
};

type bookInfo = {
  authors: Array<string>;
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: Array<string>;
  url: string;
};

function Detail() {
  const router = useRouter();
  const temp = `${router.query.params}`;
  const isbn = temp.substr(0, 10);
  const [book, setBook] = useState<bookInfo>();

  const search = async () => {
    const searchKey = isbn;
    try {
      if (searchKey !== "") {
        const params = {
          query: searchKey,
          target: "isbn",
        };
        const result = await kakaoSearch(params);

        if (result) {
          setBook(result.data.documents[0]);
        } else {
          console.log("fail");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isbn) search();
  }, [isbn]);

  useEffect(() => {
    console.log(book);
  }, [book]);

  return (
    <>
      {!book ? (
        <div>Loading...</div>
      ) : (
        <div>
          <img src={book.thumbnail} />
          <div>
            <span>{book.title}</span>
            <br />
            <span>{book.authors[0]}</span>
          </div>
          <div>
            <span>{book.contents}...</span>
          </div>
          <div>
            <button>책 구매하러 가기</button>
            <button>서평 쓰러 가기</button>
          </div>
          <div>
            <span>이 책으로 쓰여진 서평들</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
