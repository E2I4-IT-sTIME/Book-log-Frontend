import { useRecoilState, useResetRecoilState } from "recoil";
import { recoilCreateBookClubState } from "../states/recoilCreateBookClub";
import { useState, useEffect } from "react";
import { ComponentProps, DOMAttributes } from "react";
import Router from "next/router";

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

interface CreateBookClubState {
  name: string;
  img: string;
  onoff: boolean;
  max_num: number;
  tag: Array<string>;
  content: string;
  welcome: string;
  question: Array<string>;
}

interface stepProps {
  nextSteps: () => void;
}

export default function MakeClubQuestion(props: stepProps) {
  const { nextSteps } = props;
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilCreateBookClubState);
  const defaultState: CreateBookClubState = { ...recoilInfo };
  const [welcome, setWelcome] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const router = Router;

  const inputHandler: Event<"input", "onChange"> = (e) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case "welcome":
        if (welcome.length < 100) setWelcome(value);
        break;
      case "question":
        if (question.length < 100) setQuestion(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  const addQuestionBtn = () => {
    if (question !== "") {
      setQuestions((prev) => [...prev, question]);
      setQuestion("");
    }
  };

  const deleteQuestion = (ind: number) => {
    let filtered = questions.filter((question, index) => index !== ind);
    setQuestions(filtered);
  };

  const cancel = () => {
    if (
      confirm(
        "모임 생성 작업을 정말 취소하시겠습니까?\n작성하던 내용은 저장되지 않습니다."
      )
    ) {
      useResetRecoilState(recoilCreateBookClubState);
      router.back();
    }
  };

  const nextBtn = () => {
    if (welcome !== "" && questions.length !== 0) {
      if (
        confirm(
          "다음단계로 이동하시겠습니까?\n작성하던 내용은 수정할 수 없습니다."
        )
      )
        saveState();
    } else {
      alert("환영멘트와 모임질문을 모두 작성해주세요.");
    }
  };

  const saveState = () => {
    defaultState.welcome = welcome;
    defaultState.question = questions;
    setRecoilInfo(defaultState);
    nextSteps();
  };

  return (
    <div className="container">
      <span className="title">
        모임 신청자에게 궁금한 것이 있다면, 물어보세요!
      </span>
      <div className="box">
        <div className="content">
          <div className="welcome-box">
            <span className="subtitle">가입환영 멘트</span>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="모임 신청자들에게 간단한 가입 환영 멘트를 작성해주세요!"
                value={welcome}
                name="welcome"
                onChange={inputHandler}
              />
            </form>
          </div>
          <div className="question-box">
            <div>
              <span className="subtitle">가입질문</span>
              <span className="additional">
                모임 신청하는 분에게 물어보고 싶은 질문을 작성해보세요! ( 최소
                1개부터 최대 5개까지 작성 가능해요.)
              </span>
            </div>
            <div className="question-list">
              {questions.map((q, index) => (
                <form onSubmit={(e) => e.preventDefault()} key={index}>
                  <span className="q-title">질문{index + 1}.</span>
                  <input type="text" value={q} disabled />
                  <button
                    className="deleteQuestionBtn"
                    onClick={() => deleteQuestion(index)}
                  >
                    - 질문 삭제하기
                  </button>
                </form>
              ))}
              {questions.length < 5 ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <span className="q-title">질문{questions.length + 1}.</span>
                  <input
                    type="text"
                    placeholder="ex. 가장 좋아하는 책의 제목은 무엇인가요?"
                    name="question"
                    value={question}
                    onChange={inputHandler}
                  />
                  <button
                    className="addQuestionBtn"
                    onClick={() => addQuestionBtn()}
                  >
                    + 질문 추가하기
                  </button>
                </form>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="next-btns">
        <button onClick={() => cancel()}>취소</button>
        <button onClick={() => nextBtn()}>다음</button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          padding-top: 50px;
        }

        .title {
          font-size: 32px;
          color: #324a86;
          font-weight: bold;
        }

        .box {
          width: 85%;
          background-color: #e3ebff;
          padding: 100px 0px 100px 0px;
          display: flex;
          justify-content: center;

          border-radius: 50px;
          background: #e3ebff;
          box-shadow: 35px 35px 70px #c1c8d9, -35px -35px 70px #ffffff;
        }

        .content {
          width: 80%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .subtitle {
          font-size: 1.5rem;
        }

        .welcome-box,
        .question-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .additional {
          padding-left: 10px;
          color: #324a86;
        }

        .welcome-box input {
          width: 98%;
          height: 25px;
          padding: 5px 10px 5px 10px;
          background-color: white;
          border-radius: 0.5em;
          border: 1px solid #000;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }

        .question-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .question-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          justify-content: center;
        }

        .question-list form {
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
          justify-content: space-between;
        }

        .question-list input {
          width: 80%;
          height: 25px;
          padding: 5px 10px 5px 10px;
          background-color: white;
          border-radius: 0.5em;
          border: 1px solid #000;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .q-title {
          font-size: 1.2rem;
        }

        .question-list button {
          border: none;
          height: 40px;
          padding: 0px 16px 0px 15px;
          border-radius: 10px;
          color: #324a86;
          font-weight: bold;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }

        .addQuestionBtn {
          background-color: #cdd6f0;
        }
        .deleteQuestionBtn {
          background-color: #f4c4c5;
        }

        .next-btns {
          display: flex;
          flex-direction: row;
          gap: 10px;
          margin: auto;
          padding: 20px 0px 60px 0px;
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
      `}</style>
    </div>
  );
}
