interface bookInfo {
  imgSrc: string; //책 표지
  bookTitle: string; //책 제목
  author: string; //저자
  publisher: string; //출판사
  dateTime: string; //발행날짜
  content: string; //미리보기
  url: string; //판매링크
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailInfo(props: bookInfo) {
  const { imgSrc, bookTitle, author, publisher, dateTime, content, url } =
    props;
  return <></>;
}
