import PortfolioCard from "./PortfolioCard";

const PortfolioList = () => {
  const card = {
    id: 1,
    title : "독서 동아리 포트폴리오",
    sub : "포트폴리오 상세 설명 포트폴리오 상세 설명 포트폴리오 상세 설명 포트폴리오 상세 설명 포트폴리오 상세"
  }
  const portfolio_arr: any[] = [ card, card, card, card, card, card, card, card];
  return (
    <>
    <div className="background">
      {portfolio_arr.map((ele) => {
        let id = ele.id;
        let title = ele.title;
        let sub = ele.sub; 
        return <PortfolioCard title = {title} sub = {sub} key={id}/>
      })}

    </div>
    <style jsx>{`
        .background{
          display:flex;
          flex-direction:row;
          flex-wrap: wrap;
          justify-content: flex-start;
          width:100%;
        }
      
      
    `}</style>

    </>
    
  );
}

export default PortfolioList;