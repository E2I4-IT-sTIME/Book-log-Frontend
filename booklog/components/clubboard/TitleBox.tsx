import { useState, useEffect } from "react";
import axios from "axios";

interface titleProps {
  id: number;
  email: string;
  name: string;
  info: string;
  tags: Array<string>;
  stamps: number;
}

interface answerInterface {
  answers: Array<string>;
  email: string;
  questions: Array<string>;
  user_id: number;
  username: string;
}

export default function TitleBox(props: titleProps) {
  const { id, email, name, info, tags, stamps } = props;
  const [members, setMembers] = useState<Array<answerInterface>>();
  const [memberNum, setMemberNum] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

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
          setMemberNum((prev) => prev + res.data.length);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("알 수 없는 에러");
      });
  };

  useEffect(() => {
    getUserAnswers();
    if (localStorage.getItem("email") === email) {
      setIsAdmin(true);
    }
  }, []);

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
            <span>{memberNum}명</span>의 인원이 함께하고있어요.
          </span>
        ) : (
          <></>
        )}
        <span>총 {stamps}개의 스탬프를 받았어요!</span>
      </div>
    </div>
  );
}
