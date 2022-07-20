import axios from "axios";
import router from "next/router";
import InputPortfolio from "./InputPortfolio";

interface portfolioContents {
    title : string,
    desc : string
}

const AlterPortfolio = (props:any) => {
    const cardId = props.id;

    const savePortfolioData  = (enteredData: portfolioContents) => {
        const portfolioData  = {
            ...enteredData
        }
        alterPortfolio(portfolioData);
    }

    const alterPortfolio = async (portfolioData: portfolioContents) => {
        console.log("함수 실행");
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/portfolio/" + cardId,
                method: 'post',
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

    return <InputPortfolio onSavedata={savePortfolioData}/>
}

export default AlterPortfolio;