import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dispatch, SetStateAction } from "react";

interface calendarProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export default function CalendarBox(props: calendarProps) {
  const { date, setDate } = props;

  return (
    <div className="container">
      <Calendar onChange={setDate} value={date} />
      <style jsx>{`
        .react-calendar {
          border: none;
        }
      `}</style>
    </div>
  );
}
