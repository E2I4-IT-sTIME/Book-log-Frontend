import { useState, useEffect } from "react";

interface noticeProps {
  notice: string;
}

export default function NoticeBox(props: noticeProps) {
  const { notice } = props;

  //현재 로그인한 유저가 모임장인지 확인
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    //통신구문으로 검사하거나, 데이터 받아와서 검사하기
    setIsAdmin(false);
  }, []);

  const [isEmpty, setIsEmpty] = useState(false); //등록된 공지가 있다면 참, 없다면 거짓
  const [noticeContent, setNotice] = useState("");
  useEffect(() => {
    if (notice) {
      setNotice(notice);
      setIsEmpty(true);
    }
  }, []);

  return (
    <div className="container">
      <span className="title">공지사항</span>
      {isEmpty ? (
        <span>{noticeContent}</span>
      ) : (
        <span>등록된 공지가 없어요😨</span>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 310px;
          padding: 20px 20px 30px 20px;
          background-color: #eeeef9;
          border-radius: 10px;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.044),
            0 8px 16px -8px rgba(0, 0, 0, 0.048),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
          white-space: pre-line;
        }
        .title {
          padding: 5px 15px 7px 15px;
          background-color: #6b86c9;
          border-radius: 15px;
          color: white;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
