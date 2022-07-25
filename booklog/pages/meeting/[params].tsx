import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NoMember from "../../components/club/NoMember";
import Member from "./../../components/club/Member";
import axios from "axios";

export default function ClubDetail() {
  const router = useRouter();
  const clubID = Number(`${router.query.params}`);

  //통신으로 가입한 독서모임인지 아닌지 확인해야함
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    axios
      .get(`http://15.164.193.190:8080/auth/meeting/${clubID}/check`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data === "가입") setIsMember(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>{isMember ? <Member clubId={clubID} /> : <NoMember clubId={clubID} />}</>
  );
}
