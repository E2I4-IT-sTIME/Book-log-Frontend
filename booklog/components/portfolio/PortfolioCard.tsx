import axios from 'axios';
import Link from 'next/link';
import router from 'next/router';
import { useRecoilState } from 'recoil';
import {isEditState } from "../../states/recoilBookPortfolio";


const PortfolioCard = (props: any) => {
    const [isEdit, setIsEdit] = useRecoilState<boolean>(isEditState);
    
    const cardId = props.id;

    const deleltePortfolio = async (e:any) =>{
        console.log("삭제 함수 실행");
        console.log(cardId);
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/portfolio/" + cardId,
                method: 'delete',
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                withCredentials:true,
                Authorization: `${localStorage.getItem("token")}`
                }       
            })
            if(res.status == 200){
                console.log(res);
                alert("포트폴리오가 삭제되었습니다 !");
                router.push("/portfolio");
            }
        } catch(err) {
            console.log(err);  
        }
    }

    const alterPortfolio = () => {
        router.push("/portfolio/"+ cardId);
    }
    return (
        <>

        <div className="card">
            <div className="title">{props.title}</div>
            <div className="sub">{props.sub}</div>
            {isEdit ?  <div className="btns"><button className="del" onClick={deleltePortfolio}>삭제</button><button className="alter" onClick={alterPortfolio}>수정</button></div> : 
            null
            }           
        </div>

        <style jsx>{`
        .card{
            background-color:#E4EAF5;
            width:31%;
            height:200px;
            border-radius: 0px 20px 0px 20px;
            box-shadow: 5px 5px #E5E5E5;
            margin-right: 2.3%;
            margin-bottom: 30px;
        } 
        .title{
            color:#324A86;
            font-size: 25px;
            font-weight:600;
            padding : 15px 10px;
            margin : 0 10px;
            border-bottom: 3px solid gray;
        }
        .sub{
            color:#324A86;
            font-size: 16px;
            padding : 10px 10px;
            margin : 0 10px;
        }
        .card:hover{
            background-color:#D8E3FC;
            box-shadow: 5px 5px gray;
        }
        .btns {
            display:flex;
            justify-content: flex-end;
        }

        button{
            border:0px;
            border-radius:10px;
            color:white;
            font-size:18px;
            font-weight:600;
            padding: 7px 18px;
            margin-right:5px;
        }
        .del{
            background-color:#F86258;
        }
        .alter{
            background-color:#88BEE4;
        }
        `}</style>
    </>

    );
}

export default PortfolioCard;

