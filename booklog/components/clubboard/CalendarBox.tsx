import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import axios from "axios";

interface dateProps {
  id: number;
  dates: Array<string>;
}

export default function CalendarBox(props: dateProps) {
  const { id, dates } = props;

  const dateFormat = (date: Date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const monthString = month >= 10 ? `${month}` : `0${month}`;
    const dayString = day >= 10 ? `${day}` : `0${day}`;

    return `${date.getFullYear()}-${monthString}-${dayString}`;
  };

  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(dateFormat(date));

  useEffect(() => {
    setSelectDate(dateFormat(date));
  }, [date]);

  const onClickCheck = () => {
    const multipartDate = new FormData();
    multipartDate.append("date", selectDate);
    saveCheck(multipartDate);
  };

  const saveCheck = (date: FormData) => {
    axios
      .post(`http://15.164.193.190:8080/auth/meeting/${id}/attendance`, date, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("출석이 완료되었습니다.");
      })
      .catch((res) => {
        console.log(res);
        alert("출석이 완료되지 못했습니다.");
      });
  };

  return (
    <div className="container">
      <span>Stamp</span>
      <Calendar onChange={setDate} value={date} />
      <div className="check-box">
        <span>{selectDate}</span>
        <hr />
        <div className="button" onClick={() => onClickCheck()}>
          모임 출석 스탬프
        </div>
        {dates.includes(selectDate) ? (
          <div className="complete-box">
            <div>출석완료</div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        .check-box {
          width: 400px;
          height: 200px;
          background-color: #6b86c9;
          border-radius: 20px;
          padding: 20px;
          position: relative;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.25),
            0 3px 10px -3px rgba(0, 0, 0, 0.25),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .check-box span {
          color: white;
          font-size: 1.2rem;
          font-weight: 100;
        }
        hr {
          background-color: white;
          border: 0px;
          height: 1px;
        }
        .check-box .button {
          width: 60%;
          text-align: center;
          border: none;
          font-size: 1.7rem;
          letter-spacing: -0.2;
          font-weight: 900;
          color: #6b86c9;
          padding: 20px 40px;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.25),
            0 3px 10px -3px rgba(0, 0, 0, 0.25),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          margin: 47px auto;
          cursor: pointer;
          transition: all 0.25s;
        }

        .check-box .button:hover {
          transform: scale(1.1);
        }

        .complete-box {
          width: 100%;
          height: 100%;
          background-color: #494949;
          opacity: 80%;
          position: absolute;
          top: 0px;
          left: 0px;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .complete-box div {
          border: 5px solid white;
          width: 180px;
          height: 180px;
          height: 80%;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 900;
          font-size: 1.7rem;
        }
      `}</style>
    </div>
  );
}
