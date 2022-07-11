import Router from "next/router";
import { useState, useEffect } from "react";
import CreateBookClubConfirm from "./CreateBookClubConfirm";
import MakeClub from "./MakeClub";
import MakeClubQuestion from "./MakeClubQuestion";
import CompleteCreateClub from "./CompleteCreateClub";

export default function CreateBookClub() {
  const [steps, setSteps] = useState(0); //단계별 컴포넌트 구분
  const router = Router;

  const nextSteps = () => {
    setSteps((prev) => prev + 1);
  };

  useEffect(() => {
    if (steps === 3) {
      //저장하는 함수
      console.log("저장");
    }
  }, [steps]);

  return (
    <>
      <div>
        {steps === 0 ? (
          <MakeClub nextSteps={nextSteps} />
        ) : steps === 1 ? (
          <MakeClubQuestion nextSteps={nextSteps} />
        ) : steps === 2 ? (
          <CreateBookClubConfirm nextSteps={nextSteps} />
        ) : (
          <CompleteCreateClub />
        )}
      </div>
    </>
  );
}
