import axios from "axios";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";
import MyPage from "../../components/mypage/MyPage";

interface serversideProps {
  myID: number;
}

interface userInfo {
  birthday: string;
  email: string;
  id: number;
  image: string;
  job: string;
  username: string;
}

export default function myPage(props: serversideProps) {
  const { myID } = props;
  const [myInfo, setMyInfo] = useState<userInfo>();

  const [isLogined, setIsLogined] = useRecoilState(recoilLoginedState);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("index");
    setIsLogined(false);
  };

  const getInfo = () => {
    axios
      .get(`http://15.164.193.190:8080/auth/user/${myID}`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMyInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("세션이 만료되었습니다.\n다시 로그인해주세요.");
        logout();
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {myInfo ? (
        <MyPage
          birthday={myInfo.birthday}
          email={myInfo.email}
          id={myInfo.id}
          image={myInfo.image}
          job={myInfo.job}
          username={myInfo.username}
          logout={logout}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const myID = query.params;
  return { props: { myID } };
};
