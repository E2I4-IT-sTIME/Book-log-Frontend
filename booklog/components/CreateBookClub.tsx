import Router from "next/router";
import { useState } from "react";
import MakeClub from "./MakeClub";
import MakeClubQuestion from "./MakeClubQuestion";
export default function CreateBookClub() {
  const [steps, setSteps] = useState(0); //단계별 컴포넌트 구분
  const router = Router;

  const nextSteps = () => {
    setSteps((prev) => prev + 1);
  };

  return (
    <>
      <div>
        {steps === 0 ? (
          <MakeClub nextSteps={nextSteps} />
        ) : steps === 1 ? (
          <MakeClubQuestion nextSteps={nextSteps} />
        ) : (
          <>세번째단계</>
        )}
      </div>
    </>
  );
}
