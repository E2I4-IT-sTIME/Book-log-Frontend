import { useState, useEffect } from "react";
import Board from "../clubboard/Board";

interface clubInfoProps {
  clubId: number;
  isAdmin: number;
}

export default function Member(props: clubInfoProps) {
  const { isAdmin, clubId } = props;
  return (
    <>
      <Board isAdmin={isAdmin === 3 ? true : false} clubId={clubId} />
    </>
  );
}
