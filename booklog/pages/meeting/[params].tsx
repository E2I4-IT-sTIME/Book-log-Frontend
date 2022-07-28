import NoMember from "../../components/club/NoMember";
import Member from "./../../components/club/Member";
import WaitAccept from "../../components/club/WaitAccept";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";

interface serversideProps {
  clubID: number;
}

export default function ClubDetail(props: serversideProps) {
  const { clubID } = props;
  const [isMember, setIsMember] = useState(0);
  const getIsMember = async () => {
    await axios
      .get(`http://15.164.193.190:8080/auth/meeting/${clubID}/check`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setIsMember(Number(res.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getIsMember();
  }, []);

  return (
    <>
      {isMember === 0 ? (
        <NoMember clubId={clubID} />
      ) : isMember === 1 ? (
        <WaitAccept />
      ) : (
        <Member clubId={clubID} isAdmin={isMember} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const clubID = query.params;
  return { props: { clubID } };
};
