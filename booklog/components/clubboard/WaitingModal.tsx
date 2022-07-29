import downer from "../Img/downer.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface answerInterface {
  answers: Array<string>;
  email: string;
  qna_id: number;
  questions: Array<string>;
  user_id: number;
  username: string;
}

interface waitingProps {
  meetingId: number;
  waiting: Array<answerInterface>;
  update: () => void;
}

export default function WaitingModal(props: waitingProps) {
  const { meetingId, waiting, update } = props;
  const [collapse, setCollapse] = useState(false); //false면 닫혀있고 true면 열림
  const [collapseNum, setCollapseNum] = useState(0);

  const collapseHandler = (index: number) => {
    if (collapse) {
      if (collapseNum === index) {
        setCollapse((prev) => !prev);
        if (collapseNum === 0) {
          setCollapseNum(index);
        } else {
          setCollapseNum(0);
        }
      }
    } else {
      setCollapse((prev) => !prev);
      if (collapseNum === 0) {
        setCollapseNum(index);
      } else {
        setCollapseNum(0);
      }
    }
  };

  const reject = (answer_id: number) => {
    axios
      .delete(
        `http://15.164.193.190:8080/auth/${meetingId}/answer/${answer_id}`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("거절이 완료되었습니다.");
        update();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allow = (answer_id: number) => {
    axios
      .post(
        `http://15.164.193.190:8080/auth/${meetingId}/answer/${answer_id}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("수락이 완료되었습니다.");
        update();
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="container">
      {waiting.length === 0 ? (
        <span>수락 대기중인 인원이 없어요😳</span>
      ) : (
        <>
          {waiting.map((wait, index) => (
            <div key={index} className="waiter">
              <div className="waiter-prev">
                <span>{wait.username}</span>
                <div
                  onClick={() => collapseHandler(index)}
                  className={
                    collapse && collapseNum === index ? "close" : "open"
                  }
                >
                  <Image src={downer} width={20} height={15} />
                </div>
              </div>
              {collapse && index === collapseNum ? (
                <div className="waiter-detail">
                  {wait.questions.map((question, index) => (
                    <div key={index} className="qna-box">
                      <span className="question">
                        Q{index + 1}. {question}
                      </span>
                      <span className="answer">{wait.answers[index]}</span>
                    </div>
                  ))}
                  <div className="btns">
                    <button
                      onClick={() => reject(wait.qna_id)}
                      className="reject"
                    >
                      거절
                    </button>
                    <button
                      onClick={() => allow(wait.qna_id)}
                      className="allow"
                    >
                      수락
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }
        .waiter {
          width: 95%;
          background-color: #eeeef9;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.2),
            0 3px 10px -3px rgba(0, 0, 0, 0.25),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          padding: 5px 20px 5px 20px;
        }
        .waiter-prev {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .waiter-prev span {
          font-size: 20px;
          font-weight: 900;
          color: #324a86;
          text-shadow: 1px 1px 3px #00000022;
        }
        .waiter-prev div {
          cursor: pointer;
          transition: all 0.5s;
        }
        .close {
          transform: rotate(180deg);
        }
        .waiter-detail {
          display: flex;
          flex-direction: column;
          padding: 10px 0px;
          gap: 10px;
        }
        .qna-box {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .question {
          color: #324a86;
        }
        .answer {
          padding-left: 10px;
        }
        .btns {
          display: flex;
          justify-content: end;
          gap: 10px;
        }
        .btns button {
          padding: 5px 10px;
          border-radius: 5px;
          color: white;
          font-size: 14px;
          font-weight: 900;
          border: none;
          cursor: pointer;
        }
        .reject {
          background-color: #f86258;
        }
        .allow {
          background-color: #6b86c9;
        }
      `}</style>
    </div>
  );
}
