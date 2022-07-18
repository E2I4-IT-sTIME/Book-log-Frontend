import ClubCardItems from "./ClubCardItems";
import Link from "next/link";
import { useState, useEffect } from "react";

interface clubInfo {
  id: number;
  img: string;
  title: string;
  onoff: boolean;
  maxNum: number;
  curNum: number;
  subtitle: string;
  tag: Array<string>;
}

export default function MyClub() {
  const [editState, setEditState] = useState(false);

  const [clubArray, setClubArray] = useState<Array<clubInfo>>();
  const name = "이준규"; //useEffect 사용해서 사용자 이름 받아오기
  const tmp = ["추리", "판타지"];
  const club = {
    id: 123,
    img: "https://photo.jtbc.joins.com/news/2020/06/06/202006061520254167.jpg",
    title: "유아인 어쩌고",
    onoff: false,
    maxNum: 2,
    curNum: 1,
    subtitle:
      "유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다",
    tag: tmp,
  };

  useEffect(() => {
    let tmpArray = [
      club,
      club,
      club,
      club,
      club,
      club,
      club,
      club,
      club,
      club,
      club,
      club,
    ];
    setClubArray(tmpArray);
  }, []);

  const onEditHandler = () => {
    if (editState) {
      if (confirm("편집을 마치시겠습니까?")) setEditState((prev) => !prev);
    } else setEditState((prev) => !prev);
  };

  const deleteClubByIndex = (ind: number) => {
    if (clubArray) {
      let filtered = clubArray.filter((club, index) => index !== ind);
      setClubArray(filtered);
    }
  };

  return (
    <div className="container">
      <div className="upper-cover">
        <div className="name">{name}님의 독서모임📚</div>
        <div className="btns">
          <Link href="/makeclub">
            <button>독서모임 만들기</button>
          </Link>
          <button onClick={() => onEditHandler()}>
            {editState ? "편집완료" : "편집하기"}
          </button>
        </div>
      </div>
      <div className="cards-cover">
        <div className="cards">
          {clubArray ? (
            clubArray.map((club, index) => (
              <div key={index} className="card">
                <ClubCardItems
                  id={club.id}
                  img={club.img}
                  title={club.title}
                  onoff={club.onoff}
                  maxNum={club.maxNum}
                  curNum={club.curNum}
                  subtitle={club.subtitle}
                  tag={club.tag}
                  deleteState={editState}
                  deleteFunction={deleteClubByIndex}
                  index={index}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .upper-cover {
          width: 1280px;
          padding: 50px 0px 0px 0px;
        }

        .name {
          font-size: 42px;
          font-weight: 900;
          color: #324a86;
        }
        .btns {
          display: flex;
          flex-direction: row;
          gap: 10px;
          margin-top: 10px;
        }
        .btns button {
          padding: 0px 20px 0px 20px;
          border-radius: 0.5rem;
          border: 2px solid #324a86;
          background-color: white;
          height: 40px;
          color: #324a86;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
          cursor: pointer;
        }

        .btns button:hover {
          border: 2px solid white;
          background-color: #324a86;
          color: white;
        }
        .cards-cover {
          display: flex;
          flex-direction: row;
          justify-content: center;
          padding: 50px 0px 100px 0px;
        }
        .cards {
          width: 1280px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 40px;
        }
        .card {
          width: 400px;
          height: 300px;
        }
      `}</style>
    </div>
  );
}
