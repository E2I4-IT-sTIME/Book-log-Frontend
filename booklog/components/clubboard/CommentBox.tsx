import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

interface getCommentinterface {
  comment_id: number;
  content: string;
  username: string;
  email: string;
}

interface commentProps {
  meetingId: number;
  commentList: Array<getCommentinterface>;
}

export default function CommentBox(props: commentProps) {
  const { meetingId, commentList } = props;
  const router = Router;

  const [edit, setEdit] = useState(false);
  const [editNumber, setEditNumber] = useState(0);
  const [content, setContent] = useState("");
  const writeComment = (value: string) => {
    setContent(value);
  };

  const addComment = () => {
    if (content.length > 0) {
      axios
        .post(
          `http://15.164.193.190:8080/auth/meeting/${meetingId}/comment`,
          {
            content: content,
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
          alert("댓글 입력이 완료되었습니다.");
          setContent("");
          router.reload();
        })
        .catch((res) => {
          alert("댓글 입력에 실패했습니다.");
          console.log("Error!");
        });
    } else {
      alert("댓글이 너무 짧습니다.");
    }
  };

  const deleteComment = (commentID: number) => {
    axios
      .delete(
        `http://15.164.193.190:8080/auth/meeting/${meetingId}/comment/${commentID}`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("댓글 삭제가 완료되었습니다.");
        router.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [editContent, setEditContent] = useState("");

  const editClickHandler = (value: string, number: number) => {
    setEdit(true);
    setEditContent(value);
    setEditNumber(number);
  };

  const editCompleteHandler = (commentId: number) => {
    if (editContent.length > 0) {
      axios
        .patch(
          `http://15.164.193.190:8080/auth/meeting/${meetingId}/comment/${commentId}`,
          {
            content: editContent,
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
          alert("댓글 수정이 완료되었습니다.");
          setEdit(false);
          setEditContent("");
          setEditNumber(0);
          router.reload();
        })
        .catch((error) => {
          alert("댓글 수정에 실패했습니다.");
          console.log(error);
        });
    } else {
      alert("댓글이 너무 짧습니다.");
    }
  };

  return (
    <div className="container">
      <span className="title">댓글</span>
      <div className="write-box">
        <textarea
          value={content}
          onChange={(e) => writeComment(e.target.value)}
        />
        <button onClick={() => addComment()} className="save-btn">
          입력
        </button>
      </div>
      {commentList ? (
        <div className="comment-box">
          {commentList.length > 0 ? (
            commentList.map((comment) => (
              <div key={comment.comment_id} className="comment">
                {edit && editNumber === comment.comment_id ? (
                  <div className="write-box">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button
                      onClick={() => editCompleteHandler(comment.comment_id)}
                      className="save-btn"
                    >
                      수정
                    </button>
                  </div>
                ) : (
                  <div className="content-box">
                    <span className="name">{comment.username}</span>
                    <span className="content">{comment.content}</span>
                  </div>
                )}
                {comment.email === localStorage.getItem("email") && !edit ? (
                  <div className="btns">
                    <button
                      onClick={() =>
                        editClickHandler(comment.content, comment.comment_id)
                      }
                    >
                      수정
                    </button>
                    <button onClick={() => deleteComment(comment.comment_id)}>
                      삭제
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 100%;
          padding: 30px 0px 30px 0px;
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 20px;
        }
        .title {
          padding: 5px 15px 7px 15px;
          background-color: #6b86c9;
          font-size: 22px;
          border-radius: 10px;
          color: white;
          font-weight: 600;
        }

        .write-box {
          width: 100%;
          display: flex;
          align-items: start;
          justify-content: space-evenly;
        }

        .write-box textarea {
          width: 85%;
          min-height: 100px;
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

        .comment-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .content-box {
          display: flex;
          flex-direction: column;
        }

        .name {
          font-size: 18px;
          font-weight: 600;
        }
        .content {
          font-size: 16px;
          font-weight: 500;
        }
        .comment {
          width: 90%;
          position: relative;
          background-color: white;
          border: none;
          border-radius: 20px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.2),
            0 3px 10px -3px rgba(0, 0, 0, 0.25),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          margin: auto;
          padding: 20px 40px 20px 40px;
        }
        .btns {
          position: absolute;
          top: 10px;
          right: 15px;
          display: flex;
          flex-direction: row;
        }
        .btns button {
          border: none;
          background: none;
          border-radius: 5px;
          padding: 5px 10px 5px 10px;
          color: #4f4f4f;
          font-weight: 600;
          transition: all 0.25s;
          cursor: pointer;
        }
        .btns button:hover {
          color: #f85b5b;
        }
      `}</style>
    </div>
  );
}
