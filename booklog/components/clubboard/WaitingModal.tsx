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
    setCollapse((prev) => !prev);
    if (collapseNum === 0) {
      setCollapseNum(index);
    } else {
      setCollapseNum(0);
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
            <div key={index}>
              <div>
                <span>{wait.username}</span>
                <button onClick={() => collapseHandler(index)}>
                  <Image src={downer} />
                </button>
              </div>
              {collapse && index === collapseNum ? (
                <>
                  {wait.questions.map((question, index) => (
                    <div key={index}>
                      <span>
                        Q{index + 1}. {question}
                      </span>
                      <span>{wait.answers[index]}</span>
                    </div>
                  ))}
                  <div>
                    <button onClick={() => reject(wait.qna_id)}>거절</button>
                    <button onClick={() => allow(wait.qna_id)}>수락</button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
