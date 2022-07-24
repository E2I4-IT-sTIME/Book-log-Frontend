import { useState, useEffect } from "react";
import Board from "../clubboard/Board";

interface clubInfoProps {
  clubId: number;
}

export default function Member(props: clubInfoProps) {
  const { clubId } = props;
  return (
    <>
      <Board clubId={clubId} />
    </>
  );
}
