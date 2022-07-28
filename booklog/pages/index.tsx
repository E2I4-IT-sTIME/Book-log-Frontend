import type { NextPage } from "next";
import Image from "next/image";
import club from "../components/Img/club.svg";
import portfolio from "../components/Img/portfolio.svg";
import community from "../components/Img/community.svg";

const Home: NextPage = () => {
  //메인페이지
  return <>
  <div className="main">
    <div className="background">
      <div className="block">
        <div className="img"><Image src={portfolio} /></div>
        <div className="content">
          <div className="title">PORTFOLIO<span className="subtitle">나만의 특별한 독서 포트폴리오</span></div>
          <ul>
            <li>읽은 책들을 서평을 작성하여 리뷰를 남길 수 있어요 !</li>
            <li>작성한 서평으로 당신만의 포트폴리오를 만들어보세요.</li>
            <li>여러가지 포트폴리오를 만들어 다양하게 분류할 수 있어요!</li>
          </ul>
        </div>
      </div>
      <div className="block">
      <div className="img"><Image src={club} /></div>
        <div className="content">
          <div className="title">CLUB<span className="subtitle">독서 열정을 담은 다양한 독서 모임</span></div>
          <ul>
            <li>온라인 / 오프라인 독서 모임을 마음껏 만들 수 있어요!</li>
            <li>함께 하고 싶은 사람을 찾기 위해 질문을 던져보세요!</li>
            <li>내 모임뿐만 아니라 다른 모임도 도전해보세요 !</li>
          </ul>
        </div>
      </div>
      <div className="block">
      <div className="img"><Image src={community} /></div>
        <div className="content">
          <div className="title">COMMUNITY<span className="subtitle">독서 리뷰를 공유하는 커뮤니티</span></div>
          <ul>
            <li>읽고 싶은 책을 검색하고 리뷰를 확인해보세요!</li>
            <li>검색한 책을 선택하여 바로 서평을 작성할 수 있어요!</li>
            <li>이달의 랭킹으로 인기많은 책을 고를 수 있어요!</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    <style jsx>{`
      .main{
        background-color: #E4EAF5;
        min-width: 1300px;
      }
      .background{
        margin: 0 10%;
      }
      .img{
        width: 35%;
        display:flex;
        justify-content: center;
      }
      .block{
        display:flex;
        flex-direction: row; 
        justify-content: center;
        padding: 50px 0px;  
        box-shadow:  0 6px 6px -6px rgba(0, 0, 0, 0.5);
      }
      .content{
        width:65%;
        display:flex;
        flex-direction: column;   
        justify-content: center;
      }

      .title {
        color: #324A86;
        font-size: 4em;
        font-weight: bold;
        margin-left : 20px;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      }
      .subtitle{
        margin-left: 15px;
        font-size: 20px;
        text-shadow: none;
      }
      ul{
        color: #8B94AD;
        font-weight: bold;
        font-size: 18px;
      }
      
      `}</style>
  </>;
};

export default Home;
