import axios from "axios";
import { useEffect } from "react";
import PortfolioCard from "./PortfolioCard";

const PortfolioList = (props:any) => {  
  let idx = 0;
  const userIndex = "1" //수정부분

  let portfolio_arr: any[] = props.data;

  useEffect(() =>{
    LookupHandler();
  }, []);

  const LookupHandler = async () => {
    console.log("함수 실행");
    try {
      let res = await axios({
        url: "http://15.164.193.190:8080/api/user/" + userIndex + "/portfolios",
        method: 'get',
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          withCredentials:true,
          Authorization: `${localStorage.getItem("token")}`
        }       
      })
      if(res.status == 200){
        console.log(res.data);
        let portfolios_data = JSON.parse(res.data);
        portfolio_arr = portfolios_data;
      }
    } catch(err){
      console.log(err);  
    }
  };

  return (
    <>
    <div className="background">
      {portfolio_arr.map((ele) => {
        let title = ele.title;
        let sub = ele.sub; 
        idx++;
        return <PortfolioCard title = {title} sub = {sub} key = {idx} id={idx}/>
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