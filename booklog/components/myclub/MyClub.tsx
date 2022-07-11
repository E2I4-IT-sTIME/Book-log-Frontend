import ClubCardItems from "./ClubCardItems";

export default function MyClub() {
  const name = "이준규"; //useEffect 사용해서 사용자 이름 받아오기
  const tmp = ["추리", "판타지"];
  const club = {
    img: "https://photo.jtbc.joins.com/news/2020/06/06/202006061520254167.jpg",
    title: "유아인 어쩌고",
    onoff: false,
    maxNum: 2,
    curNum: 1,
    subtitle:
      "유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다유아인 잘생겼다",
    tag: tmp,
  };
  const clubArray = [club, club, club, club, club, club, club];
  return (
    <div>
      <div>{name}님의 독서모임</div>
      <hr />
      {clubArray.map((club, index) => (
        <div key={index}>
          <ClubCardItems
            img={club.img}
            title={club.title}
            onoff={club.onoff}
            maxNum={club.maxNum}
            curNum={club.curNum}
            subtitle={club.subtitle}
            tag={club.tag}
          />
        </div>
      ))}
    </div>
  );
}
