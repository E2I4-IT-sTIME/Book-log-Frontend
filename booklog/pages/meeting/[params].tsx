import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NoMember from "../../components/club/NoMember";
import Member from "./../../components/club/Member";

export default function ClubDetail() {
  const router = useRouter();
  const clubID = Number(`${router.query.params}`);

  //통신으로 가입한 독서모임인지 아닌지 확인해야함
  const [isMember, setIsMember] = useState(true);

  return (
    <>{isMember ? <Member clubId={clubID} /> : <NoMember clubId={clubID} />}</>
  );
}
