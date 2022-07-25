import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIndexState } from "../../states/recoilUserIndex";
import PortfolioCard from "./PortfolioCard";

const PortfolioList = (props:any) => {  
  const [userIndex, setUserIndex] = useRecoilState<number>(userIndexState);
  const [portfolio_arr, setPortfolio_arr] = useState([
    props.data
  ])

  useEffect(() =>{
    LookupHandler();
  }, []);

  const LookupHandler = async () => {
    console.log("함수 실행");
    try {
      let res = await axios({
        url: "http://15.164.193.190:8080/auth/user/" + userIndex + "/portfolios",
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
        let portfolios_data = res.data;
        setPortfolio_arr(portfolios_data);
      }
    } catch(err){
      console.log(err);  
    }
  };

  return (
    <>
    <div className="background">
      {portfolio_arr.length == 0 ? null :portfolio_arr.map((ele) => {
        let title = ele.title;
        let content = ele.content; 
        let id = ele.portfolio_id;
        return <PortfolioCard title = {title} content = {content} key = {id} id={id}/>
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