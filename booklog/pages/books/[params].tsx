import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultImg from "../../components/Img/book_title_no.png";
import Image from "next/image";

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
  const [isbn, setIsbn] = useState("");
  useEffect(() => {
    if (temp.substr(0, 1) !== " ") {
      setIsbn(temp.substr(0, 10));
    } else {
      setIsbn(temp.substr(1, 13));
    }
  }, []);
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

  const onClickLink = () => {
    window.open(`${book?.url}`);
  };

  return (
    <>
      {!book ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <div className="first-box">
            <div className="img-box">
              {book.thumbnail ? (
                <div>
                  <img src={book.thumbnail} className="thumbnail" />
                </div>
              ) : (
                <div>
                  <Image src={defaultImg} width="250px" height="363px" />
                </div>
              )}
            </div>
            <div className="info-box">
              <div className="title">{book.title}</div>
              <div className="author">{book.authors[0]}</div>
              <p className="content">{book.contents}...</p>
              <div className="button-box">
                <button onClick={() => onClickLink()}>책 구매하러 가기</button>
                <button>서평 쓰러 가기</button>
              </div>
            </div>
          </div>
          <div className="portfolio-box">
            <span>이 책으로 쓰여진 서평들</span>
          </div>
          <style jsx>{`
            .container {
              display: flex;
              flex-direction: column;
            }

            .first-box {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 100px;
              margin: 50px 100px 50px 100px;
              padding: 50px;
              border-radius: 1rem;
              background-color: #324a86;
              box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
                0 8px 16px -8px rgba(0, 0, 0, 0.3),
                0 -6px 16px -6px rgba(0, 0, 0, 0.025);
            }

            .thumbnail {
              width: 250px;
            }

            .info-box {
              display: flex;
              flex-direction: column;
              color: white;
            }

            .title {
              font-size: 1.5rem;
              letter-spacing: -0.05;
              font-weight: bold;
            }

            .author {
              margin-top: 10px;
              font-size: 1.2rem;
            }

            .content {
              margin-top: 30px;
              line-height: 20px;
            }

            .button-box {
              display: flex;
              flex-direction: row;
              margin-top: 10px;
              gap: 20px;
            }

            button {
              background: #fff;
              color: #324a86;
              border: none;
              position: relative;
              height: 40px;
              font-size: 1em;
              padding: 0 2em;
              cursor: pointer;
              transition: 800ms ease all;
              outline: none;
            }
            button:hover {
              background: #324a86;
              color: #fff;
            }
            button:before,
            button:after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              height: 2px;
              width: 0;
              background: #fff;
              transition: 200ms ease all;
            }
            button:after {
              right: inherit;
              top: inherit;
              left: 0;
              bottom: 0;
            }
            button:hover:before,
            button:hover:after {
              width: 100%;
              transition: 800ms ease all;
            }
          `}</style>
        </div>
      )}
    </>
  );
}

export default Detail;
