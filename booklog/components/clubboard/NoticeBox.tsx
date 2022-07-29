import { useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import axios from "axios";

interface noticeProps {
  isAdmin: boolean;
  id: number;
}

interface commentInterface {
  comment_id: number;
  content: string;
  username: string;
  email: string;
}

interface noticeInterface {
  notice: string;
  getCommentResList: Array<commentInterface>;
}

export default function NoticeBox(props: noticeProps) {
  const { isAdmin, id } = props;

  const [notification, setNotification] = useState<noticeInterface>();
  const [isEmpty, setIsEmpty] = useState(false); //등록된 공지가 있다면 참, 없다면 거짓
  const [noticeContent, setNotice] = useState("");

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = () => {
    axios
      .get(`http://15.164.193.190:8080/auth/meeting/${id}/notice`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setNotification(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (notification && notification.notice) {
      setNotice(notification.notice);
      setIsEmpty(true);
    }
  }, [notification]);

  //공지 추가관련
  const [addBtn, setAddBtn] = useState(false);
  const [noticeWritten, setNoticeWritten] = useState("");

  const saveNotice = () => {
    if (noticeWritten.length > 10) {
      axios
        .patch(
          `http://15.164.193.190:8080/auth/meeting/${id}/notice`,
          {
            notice: noticeWritten,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          alert("공지 등록이 완료되었습니다.");
          setNotice(noticeWritten);
          setNoticeWritten("");
          setIsEmpty(true);
          setAddBtn(false);
        })
        .catch((error) => {
          alert("공지 등록에 실패했습니다.");
          console.log(error);
        });
    } else {
      alert("공지가 너무 짧습니다.");
    }
  };

  const editNotice = () => {
    setNoticeWritten(noticeContent);
    setIsEmpty(false);
    setAddBtn(true);
  };

  const deleteNotice = () => {
    axios
      .delete(`http://15.164.193.190:8080/auth/meeting/${id}/notice`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("공지 삭제가 완료되었습니다.");
        setNotice("");
        setIsEmpty(false);
      })
      .catch((error) => {
        alert("공지 삭제에 실패했습니다.");
        console.log(error);
      });
  };

  return (
    <div className="container">
      <span className="title">공지사항</span>
      {isEmpty ? (
        <div className="notification">
          <span>{noticeContent}</span>
          <div className="btns">
            <span onClick={() => editNotice()}>수정</span>
            <span
              onClick={() => {
                deleteNotice();
              }}
            >
              삭제
            </span>
          </div>
        </div>
      ) : (
        <>
          {isAdmin ? (
            addBtn ? (
              <div className="notice-box">
                <textarea
                  value={noticeWritten}
                  onChange={(e) => setNoticeWritten(e.target.value)}
                />
                <button onClick={() => saveNotice()} className="save-btn">
                  저장
                </button>
              </div>
            ) : (
              <div className="notice-box">
                <button onClick={() => setAddBtn(true)} className="make-btn">
                  공지 추가하기
                </button>
              </div>
            )
          ) : (
            <div className="notice-box">
              <span>등록된 공지가 없어요😨</span>
            </div>
          )}
        </>
      )}
      <hr />
      {notification ? (
        <CommentBox
          meetingId={id}
          commentList={notification.getCommentResList}
        />
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 1200px;
          padding: 40px 40px 50px 40px;
          background-color: #eeeef9;
          border-radius: 10px;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.044),
            0 8px 16px -8px rgba(0, 0, 0, 0.048),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
          white-space: pre-line;
        }
        .title {
          padding: 5px 15px 7px 15px;
          background-color: #6b86c9;
          font-size: 22px;
          border-radius: 10px;
          color: white;
          font-weight: 600;
        }

        .notice-box {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: start;
          padding: 30px 0px 30px 0px;
        }

        textarea {
          width: 85%;
          min-height: 200px;
        }

        .make-btn {
          padding: 20px 40px;
          border-radius: 10px;
          border: 2px solid #6b86c9;
          background: white;
          font-size: 18px;
          font-weight: 600;
          color: #6b86c9;
          transition: all 0.25s;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }

        .make-btn:hover {
          border: 2px solid white;
          background: #6b86c9;
          color: white;
        }

        .save-btn {
          width: 8%;
          height: 60px;
          border-radius: 15px;
          border: none;
          background-color: #6b86c9;
          color: white;
          font-size: 18px;
          font-weight: 900;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
          transition: all 0.25s;
        }

        .save-btn:hover {
          background-color: #f85b5b;
        }

        .notification {
          padding: 30px 10px 30px 10px;
          font-size: 18px;
          font-weight: 550;
          position: relative;
        }

        .btns {
          position: absolute;
          top: 0px;
          right: 0px;
          display: flex;
          flex-direction: row;
          gap: 10px;
        }

        .btns span {
          font-size: 20px;
          color: #6b86c9;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
        }

        .btns span:hover {
          color: #f85b5b;
        }
      `}</style>
    </div>
  );
}
