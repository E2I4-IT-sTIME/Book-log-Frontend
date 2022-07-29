import { useState, useEffect } from "react";
import axios from "axios";
import BasicModal from "../BasicModal";
import WaitingModal from "./WaitingModal";

interface titleProps {
  isAdmin: boolean;
  id: number;
  name: string;
  info: string;
  tags: Array<string>;
  stamps: number;
  onoff: boolean;
}

interface answerInterface {
  answers: Array<string>;
  email: string;
  qna_id: number;
  questions: Array<string>;
  user_id: number;
  username: string;
}

export default function TitleBox(props: titleProps) {
  const { onoff, isAdmin, id, name, info, tags, stamps } = props;
  const [members, setMembers] = useState<Array<answerInterface>>();
  const [memberNum, setMemberNum] = useState(0);

  const getUserAnswers = () => {
    axios
      .get(`http://15.164.193.190:8080/auth/meetings/${id}/answers`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setMembers(res.data);
          setMemberNum(res.data.length);
        } else {
          setMembers([]);
          setMemberNum(0);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("알 수 없는 에러");
      });
  };

  useEffect(() => {
    getUserAnswers();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">{name}</span>
        <span className="subtitle">{info}</span>
      </div>
      <div className="tag-box">
        {tags.map((tag, index) => (
          <span className="tag" key={index}>
            {tag}
          </span>
        ))}
        <span className="tag">{onoff ? "온라인모임" : "오프라인모임"}</span>
      </div>
      <div className="detail-box">
        {isAdmin ? (
          <span>
            <span onClick={() => setModalOpen(true)} className="empha">
              현재 {memberNum}명
            </span>
            의 인원이 승인을 기다리고있어요.
          </span>
        ) : (
          <></>
        )}
        <span>
          <span className="empha">총 {stamps}개</span>의 스탬프를 받았어요!
        </span>
      </div>
      <BasicModal
        open={modalOpen}
        close={closeModal}
        save={closeModal}
        header="수락 대기인원"
      >
        {members ? (
          <WaitingModal
            meetingId={id}
            waiting={members}
            update={getUserAnswers}
          />
        ) : (
          <WaitingModal meetingId={id} waiting={[]} update={getUserAnswers} />
        )}
      </BasicModal>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: end;
          gap: 20px;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          align-items: end;
        }
        .title {
          color: #324a86;
          font-size: 44px;
          font-weight: 900;
          text-shadow: 1px 1px 3px #00000034;
        }
        .subtitle {
          max-width: 580px;
          color: #324a86;
          font-size: 28px;
          font-weight: 550;
          white-space: pre-line;
          text-align: end;
          line-height: 34px;
          text-shadow: 1px 1px 3px #00000022;
        }
        .tag-box {
          display: flex;
          flex-direction: row;
          max-width: 580px;
          align-items: center;
          gap: 10px;
        }
        .tag {
          cursor: pointer;
          background-color: #324a86;
          color: white;
          font-weight: 600;
          padding: 10px 20px 10px 20px;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.2),
            0 3px 10px -3px rgba(0, 0, 0, 0.25),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .detail-box {
          display: flex;
          flex-direction: column;
          align-items: end;
          color: #324a86;
          font-size: 22px;
          font-weight: 500;
        }
        .empha {
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          decoration: underline;
        }
        .empha:hover {
          color: #f85b5b;
        }
      `}</style>
    </div>
  );
}
