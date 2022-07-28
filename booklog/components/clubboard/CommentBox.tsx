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
      <span>댓글</span>
      <div>
        <textarea
          value={content}
          onChange={(e) => writeComment(e.target.value)}
        />
        <button onClick={() => addComment()}>입력</button>
      </div>
      {commentList ? (
        <div>
          {commentList.length > 0 ? (
            commentList.map((comment) => (
              <div key={comment.comment_id}>
                {edit && editNumber === comment.comment_id ? (
                  <>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button
                      onClick={() => editCompleteHandler(comment.comment_id)}
                    >
                      수정
                    </button>
                  </>
                ) : (
                  <>
                    <span>{comment.username}</span>
                    <span>{comment.content}</span>
                  </>
                )}
                {comment.email === localStorage.getItem("email") && !edit ? (
                  <div>
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
    </div>
  );
}
