import { useState, useEffect } from "react";
import ClubInfo from "../../components/club/ClubInfo";
import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";
import { useRouter } from "next/router";
import CompleteJoin from "./CompleteJoin";

interface clubInfoProps {
  clubId: number;
}

interface clubInfoPublic {
  id: number;
  image: string;
  info: string;
  max_num: number;
  cur_num: number;
  name: string;
  ment: string;
  onoff: boolean;
}

const defaultClUbInfo: clubInfoPublic = {
  id: 0,
  image: "",
  info: "",
  max_num: 0,
  cur_num: 0,
  name: "",
  ment: "",
  onoff: false,
};

export default function NoMember(props: clubInfoProps) {
  const router = useRouter();
  const [isLogined, setIsLogined] = useRecoilState(recoilLoginedState);
  const [steps, setSteps] = useState(false); //true되면 가입신청완료

  //모임 아이디로 모임 정보 받아와야함
  const clubId = Number(`${router.query.params}`);
  const [clubInfo, setClubInfo] = useState<clubInfoPublic>(defaultClUbInfo);
  const [tags, setTags] = useState([""]);
  const [questions, setQuestions] = useState([""]);

  const getClubInfo = () => {
    axios
      .get(`http://15.164.193.190:8080/meetings/${clubId}`)
      .then((res) => {
        const getData = res.data;
        const inputData: clubInfoPublic = {
          id: getData.id,
          name: getData.name,
          image: getData.image,
          info: getData.info,
          max_num: getData.max_num,
          cur_num: getData.cur_num,
          ment: getData.ment,
          onoff: getData.onoff,
        };
        const inputTags: Array<string> = res.data.tags;

        setClubInfo(inputData);
        setTags([...inputTags]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getQuestions = () => {
    axios
      .get(`http://15.164.193.190:8080/auth/${clubId}/question`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const getData = res.data;
        const inputData: Array<string> = getData.questions;
        setQuestions([...inputData]);
      })
      .catch((error) => {
        console.log(error);
        logout();
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogined(false);
    router.push("/sign");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getClubInfo();
      getQuestions();
    } else {
      logout();
    }
  }, []);

  return (
    <div className="container">
      <div>
        {tags[0] !== "" && questions[0] !== "" ? (
          steps ? (
            <CompleteJoin />
          ) : (
            <ClubInfo
              id={clubInfo.id}
              name={clubInfo.name}
              img={clubInfo.image}
              onoff={clubInfo.onoff}
              max_num={clubInfo.max_num}
              cur_num={clubInfo.cur_num}
              tag={tags}
              content={clubInfo.info}
              welcome={clubInfo.ment}
              question={questions}
              setSteps={setSteps}
            />
          )
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        .container {
          white-space: pre-line;
        }
        .img-box {
          width: 400px;
          height: 500px;
          background-image: url(${clubInfo.image});
          background-size: cover;
          background-position: 50%;
        }
      `}</style>
    </div>
  );
}
