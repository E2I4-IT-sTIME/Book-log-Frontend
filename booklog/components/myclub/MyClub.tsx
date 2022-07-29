import ClubCardItems from "./ClubCardItems";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

interface clubInfo {
  username: string;
  id: number;
  email: string;
  image: string;
  name: string;
  onoff: boolean;
  max_num: number;
  cur_num: number;
  info: string;
  tags: Array<string>;
}

export default function MyClub() {
  const [editState, setEditState] = useState(false);
  const router = Router;
  const [userId, setUserId] = useState(localStorage.getItem("index"));
  const [userName, setUserName] = useState("Booklog");
  const [clubArray, setClubArray] = useState<Array<clubInfo>>();
  const getMyClubs = () => {
    axios
      .get(`http://15.164.193.190:8080/auth/user/${userId}/meetings`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setClubArray(res.data);
          setUserName(res.data[0].username);
        } else {
          alert(
            "아직 가입하거나 만든 모임이 없어요.\n먼저 모임에 가입해주세요."
          );
          router.back();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMyClubs();
  }, []);

  const onEditHandler = () => {
    if (editState) {
      if (confirm("편집을 마치시겠습니까?")) setEditState((prev) => !prev);
    } else setEditState((prev) => !prev);
  };

  const deleteClubByIndex = (ind: number, id: number) => {
    axios
      .delete(`http://15.164.193.190:8080/auth/meeting/${id}`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (clubArray) {
          let filtered = clubArray.filter((club, index) => index !== ind);
          setClubArray(filtered);
        }
      })
      .catch((error) => {
        alert("모임 삭제에 실패했습니다.");
        console.log(error);
      });
  };

  const resignClubByIndex = (ind: number, id: number) => {
    axios
      .delete(`http://15.164.193.190:8080/auth/meeting/${id}/out`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (clubArray) {
          let filtered = clubArray.filter((club, index) => index !== ind);
          setClubArray(filtered);
        }
      })
      .catch((error) => {
        alert("모임 탈퇴에 실패했습니다.");
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="upper-cover">
        <div className="name">{userName}님의 독서모임📚</div>
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
                  email={club.email}
                  img={club.image}
                  title={club.name}
                  onoff={club.onoff}
                  maxNum={club.max_num}
                  curNum={club.cur_num}
                  subtitle={club.info}
                  tag={club.tags}
                  deleteState={editState}
                  deleteFunction={deleteClubByIndex}
                  resignFunction={resignClubByIndex}
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
