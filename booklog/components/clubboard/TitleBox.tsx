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
  const { isAdmin, id, name, info, tags, stamps } = props;
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
        console.log(res);
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
      </div>
      <div className="detail-box">
        {isAdmin ? (
          <span>
            <span onClick={() => setModalOpen(true)}>{memberNum}명</span>의
            인원이 승인을 기다리고있어요.
          </span>
        ) : (
          <></>
        )}
        <span>총 {stamps}개의 스탬프를 받았어요!</span>
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
    </div>
  );
}
