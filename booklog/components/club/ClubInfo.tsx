import Router from "next/router";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import BasicModal from "../BasicModal";
import axios from "axios";

interface ClubInfoProps {
  id: number;
  name: string;
  img: string;
  onoff: boolean;
  max_num: number;
  cur_num: number;
  tag: Array<string>;
  content: string;
  welcome: string;
  question: Array<string>;
  setSteps: Dispatch<SetStateAction<boolean>>;
}

export default function ClubInfo(props: ClubInfoProps) {
  const {
    id,
    name,
    img,
    onoff,
    max_num,
    cur_num,
    tag,
    content,
    welcome,
    question,
    setSteps,
  } = props;
  const router = Router;

  const cancel = () => {
    router.back();
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [answers, setAnswers] = useState<Array<string>>([]);

  useEffect(() => {
    question.forEach((value) => {
      setAnswers((prev) => [...prev, ""]);
    });
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const completeJoin = () => {
    if (answers.length === 5) {
      if (confirm("정말로 가입 신청하시겠습니까?")) {
        join();
      }
    }
  };
  const inputAnswer = (ind: number, value: string) => {
    setAnswers(
      answers.map((answer, index) => (ind === index ? value : answer))
    );
  };

  const join = async () => {
    await axios
      .post(
        `http://15.164.193.190:8080/auth/meetings/${id}`,
        {
          answers: answers,
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
        console.log(res);
        setSteps(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <span className="title">{`앗, 아직 모임 회원이 아니시네요.\n간단하게 가입하고 독서를 즐겨보세요!`}</span>
      <div className="box">
        <div className="upper-box">
          <div className="img-box">
            <div className="hover-box" />
            <div className="club-name">{name}</div>
          </div>

          <div className="info-first">
            <div className="max-onoff">
              <span>
                <span className="str">{name}</span> 은(는),
              </span>
              <span>
                <span className="str">{`(${cur_num}/${max_num})명`}</span>의{" "}
                <span className="str">
                  {onoff ? "온라인 모임" : "오프라인 모임"}
                </span>{" "}
                입니다!
              </span>
            </div>
            <span className="content">{content}</span>
            <div className="tag-box">
              <span>태그</span>
              <div className="tags">
                {tag.map((t, index) =>
                  t !== null ? (
                    <div className="tag" key={index}>
                      #{t}
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="info-second">
          <div className="welcome">
            <div className="welcome-ment">
              <span>" </span>
              {welcome}
              <span> "</span>
            </div>
            <div className="question-box">
              {question.map((q, index) =>
                q !== null ? (
                  <div className="question" key={index}>
                    Q{index + 1}. {q}
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="next-btns">
        <button onClick={() => cancel()}>취소</button>
        <button onClick={() => openModal()}>답변하기</button>
      </div>
      <BasicModal
        open={modalOpen}
        close={closeModal}
        save={completeJoin}
        header="답변하기"
      >
        <div className="modal">
          {question.map((q, index) =>
            q !== null ? (
              <div key={index} className="modal-question">
                <label htmlFor={`${index}`}>{q}</label>
                <input
                  type="text"
                  placeholder="답변을 입력해주세요."
                  id={`${index}`}
                  value={answers[index]}
                  onChange={(e) => inputAnswer(index, e.target.value)}
                />
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </BasicModal>

      <style jsx>{`
        .container {
          padding-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          padding-bottom: 100px;
        }
        .title {
          font-size: 32px;
          color: #324a86;
          font-weight: bold;
          text-align: center;
          z-index: 1000;
        }

        .box {
          width: 80%;
          background-color: #e3ebff;
          padding: 70px;
          display: flex;
          flex-direction: column;
          border-radius: 50px;
          background: #e3ebff;
          box-shadow: 35px 35px 70px #c1c8d9, -35px -35px 70px #ffffff;
        }
        .upper-box {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
        }

        .img-box {
          display: flex;
          justify-content: center;
          align-items: center;
          object-fit: cover;
          overflow: hidden;
          width: 400px;
          height: 400px;
          border-radius: 100px;
          background-image: url(${img});
          background-size: cover;
          background-position: 50%;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
            0 8px 16px -8px rgba(0, 0, 0, 0.3),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
          position: relative;
        }
        .hover-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          border-radius: 100px;
          border: 2px solid rgba(255, 255, 255, 0.18);
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          transition: opacity 0.25s linear;
        }

        .club-name {
          position: absolute;
          background-color: #cdd6f0;
          padding: 20px 40px 20px 40px;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: bold;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          opacity: 0.5;
          transition: all 0.25s linear;
          cursor: pointer;
        }
        .img-box:hover .hover-box,
        .img-box:hover .club-name {
          opacity: 1;
        }

        .club-name:hover {
          transform: scale(1.1);
        }

        .max-onoff {
          font-size: 28px;
          color: black;
          font-weight: 900;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .str {
          background-color: #324a86;
          color: white;
          padding: 5px;
          border-radius: 5px;
        }
        .info-first {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .tag-box {
          background-color: white;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .tag-box span {
          font-size: 24px;
          font-weight: bold;
          color: #324a86;
        }

        .tags {
          display: flex;
          flex-direction: row;
          gap: 8px;
          padding-top: 8px;
        }

        .tag {
          background-color: #324a86;
          color: white;
          padding: 8px;
          font-weight: 400;
          border-radius: 5px;
        }
        .content {
          white-space: pre-wrap;
          line-height: 30px;
          font-size: 20px;
          flex-grow: 0;
        }
        .info-second {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 65px;
          gap: 30px;
          max-width: 100%;
        }
        .welcome {
          font-size: 32px;
          font-weight: bold;
          font-style: italic;
          background-color: white;
          padding: 15px 25px 15px 10px;
          border-radius: 10px;
          min-width: 60%;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .welcome span {
          font-size: 36px;
        }

        .question-box {
          font-size: 20px;
          font-weight: 500;
          font-style: normal;
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .question {
          margin: auto;
        }
        .next-btns {
          display: flex;
          flex-direction: row;
          gap: 10px;
          margin: auto;
          padding: 20px 0px 60x 0px;
        }
        .next-btns button {
          padding: 10px 25px 10px 25px;
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

        .next-btns button:hover {
          border: 2px solid white;
          background-color: #324a86;
          color: white;
        }

        .modal {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .modal-question {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .modal-question label {
          font-size: 14px;
          color: #434343;
        }

        .modal-question input {
          height: 18px;
        }
      `}</style>
    </div>
  );
}
