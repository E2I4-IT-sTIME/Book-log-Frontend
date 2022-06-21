import type { NextPage } from "next";

const portfolio: NextPage = () => {
  return (
    <>
      <div className="book_review_list"></div>
      <div className="my_profile"></div>
      <style jsx>{`
        .book_review_list {
          width: 60%;
          height: 100px;
          background-color: black;
        }
        .my_profile {
          width: 40%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default portfolio;
