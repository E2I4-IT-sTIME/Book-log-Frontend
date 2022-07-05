import { useState } from "react";

interface setter {
  content: string;
  genres: Array<string>;
  setContent: (value: string) => void;
  setGenres: (value: string) => void;
  deleteGenre: (value: string) => void;
}

export default function MakeClubDown(props: setter) {
  const { setContent, setGenres, deleteGenre, content, genres } = props;
  const [tmpVal, setTmpVal] = useState("");
  const [error, setError] = useState("");

  const inputGenre = () => {
    if (genres.length <= 5) {
      if (tmpVal !== "") {
        setGenres(tmpVal);
        setTmpVal("");
        setError("");
      }
    } else {
      setError("태그는 5개까지만 입력할 수 있습니다.");
    }
  };

  return (
    <div className="container">
      <div className="intro-box">
        모임 소개
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="200자 이내로 간단하게 해당 모임을 소개해주세요!"
          />
        </form>
      </div>
      <div className="tag-box">
        <div>
          {"나만의 모임태그"}
          <span className="tag-intro">
            선호하는 지역, 장르,목적 등 원하는 태그를 추가해서 당신의 모임을
            표현해보세요 :)
          </span>
        </div>

        <span className="error">{error}</span>
        <div className="tag-inner-box">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={tmpVal}
              onChange={(e) => setTmpVal(e.target.value)}
              placeholder="해시태그"
            />
            <button onClick={inputGenre}>입력</button>
          </form>
          <div className="genres">
            {genres
              .filter((genre) => genre !== "")
              .map((genre, index) => (
                <div
                  className="genre"
                  onClick={() => {
                    deleteGenre(genre);
                    setError("");
                  }}
                  key={index}
                >
                  #{genre}
                </div>
              ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 70%;
          gap: 20px;
        }
        .intro-box {
          font-size: 1.5rem;
        }

        .intro-box textarea {
          border-radius: 0.5em;
          height: 100px;
          border: 0.5px solid black;
          padding: 10px;
          width: 100%;
          margin-top: 10px;
          align-items: top;
        }
        .tag-box {
          font-size: 1.5rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tag-intro {
          font-size: 1rem;
          padding-left: 10px;
        }
        .tag-inner-box {
          width: 100%;
          background-color: white;
          padding: 15px 10px 15px 10px;
          border-radius: 5px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tag-inner-box form {
          display: flex;
          flex-direction: row;
          gap: 15px;
        }
        .tag-inner-box input {
          margin-left: 10px;
          border: none;
          background-color: #d9d9d9;
          padding: 10px;
          border-radius: 5px;
        }
        .tag-inner-box form button {
          padding: 0px 20px 0px 20px;
          border-radius: 0.5rem;
          border: 2px solid #324a86;
          background-color: white;
          color: #324a86;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
          cursor: pointer;
        }

        .tag-inner-box form button:hover {
          border: 2px solid white;
          background-color: #324a86;
          color: white;
        }

        .error {
          font-size: 1rem;
          color: #324a86;
        }

        .genres {
          display: flex;
          flex-direction: row;
          gap: 10px;
          margin-left: 10px;
        }

        .genre {
          background-color: #324a86;
          color: white;
          font-weight: 500;
          padding: 10px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
