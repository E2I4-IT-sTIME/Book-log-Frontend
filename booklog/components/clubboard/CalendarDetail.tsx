interface dateInfoProps {
  date: string;
  content: string;
  check: boolean;
}

export default function CalendarDetail(props: dateInfoProps) {
  const { date, content, check } = props;
  return (
    <div className="container">
      <span className="date">{date}</span>
      <div className="line" />
      {content ? (
        <span className="content">{content}</span>
      ) : (
        <span className="content">모임 내역이 없네요😨</span>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 950px;
          min-height: 400px;
          background-color: #eeeeee;
          padding: 40px;
          white-space: pre-line;
          border-radius: 10px;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.044),
            0 8px 16px -8px rgba(0, 0, 0, 0.048),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
        }
        .line {
          height: 1px;
          background-color: gray;
        }
        .date {
          font-size: 1rem;
          color: gray;
        }
        .content {
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
