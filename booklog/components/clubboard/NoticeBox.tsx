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
        <div>
          <span>{noticeContent}</span>
          <div>
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
              <div>
                <textarea
                  value={noticeWritten}
                  onChange={(e) => setNoticeWritten(e.target.value)}
                />
                <button onClick={() => saveNotice()}>저장</button>
              </div>
            ) : (
              <button onClick={() => setAddBtn(true)}>공지 추가하기</button>
            )
          ) : (
            <>
              <span>등록된 공지가 없어요😨</span>
            </>
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
          width: 600px;
          padding: 20px 20px 30px 20px;
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
          border-radius: 15px;
          color: white;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
