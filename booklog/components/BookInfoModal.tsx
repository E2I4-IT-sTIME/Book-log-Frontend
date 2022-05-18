interface bookInfo {
  rank: number; //랭킹
  imgSrc: string; //책 표지
  bookTitle: string; //책 제목
  author: string; //저자
  publisher: string; //출판사
  dateTime: string; //발행날짜
  content: string; //미리보기
  url: string; //판매링크
}

export default function BookInfoModal(props: bookInfo) {
  const { rank, imgSrc, bookTitle, author, publisher, dateTime, content, url } =
    props;
  return (
    <div>
      <img src={imgSrc} alt={bookTitle} />
      <h2>{bookTitle}</h2>
      <span>
        {author} | {publisher}
      </span>
      <span>{dateTime}</span>
      <p>{content}</p>
      <a href={url}>책 정보 자세히 보기</a>
    </div>
  );
}
