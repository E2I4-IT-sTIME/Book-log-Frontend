import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIndexState } from "../../states/recoilUserIndex";
import InputPortfolio from "./InputPortfolio";

interface portfolioContents {
    title : string,
    desc : string
}

const AlterPortfolio = (props:any) => {
    const cardId = props.id;
    const [userIndex, setUserIndex] = useRecoilState<number>(userIndexState);

    const [beforeProfol, setBeforeProfol] = useState({
        title : "",
        content : ""
    })

    useEffect(() =>{
        beforePortfolio();
    }, []);

    console.log(beforeProfol);

    const savePortfolioData  = (enteredData: portfolioContents) => {
        const portfolioData  = {
            ...enteredData
        }
        alterPortfolio(portfolioData);
    }

    const beforePortfolio = async () => {
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/user/" + userIndex + "/portfolios/" + cardId,
                method: 'get',
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                withCredentials:true,
                Authorization: `${localStorage.getItem("token")}`
                }       
            })
            if(res.status == 200){
                let beforeData = res.data;
                let title = beforeData.title;
                let content = beforeData.content;
                setBeforeProfol({
                    title : title,
                    content : content
                })
            }
        } catch(err) {
            console.log(err);  
        }
    };
    const alterPortfolio = async (portfolioData: portfolioContents) => {
        console.log("함수 실행");
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/portfolio/" + cardId,
                method: 'patch',
                data : portfolioData,
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                withCredentials:true,
                Authorization: `${localStorage.getItem("token")}`
                }       
            })
            if(res.status == 200){
                console.log(res);
                alert("포트폴리오가 수정되었습니다 !");
                router.push("/portfolio");
            }
        } catch(err) {
            console.log(err);  
        }
    };

    return <InputPortfolio beforeProfol={beforeProfol} onSavedata={savePortfolioData}/>
}

export default AlterPortfolio;