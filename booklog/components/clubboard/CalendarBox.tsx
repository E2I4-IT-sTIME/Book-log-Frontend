import Calendar from "react-calendar";
import { useState } from "react";

export default function CalendarBox() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="container">
      <span>Stamp</span>
    </div>
  );
}
