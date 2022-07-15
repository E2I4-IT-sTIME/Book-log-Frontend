import axios from "axios";
import { useState } from "react";

interface portfolioContents {
    title : string,
    desc : string
}

const MakePortfolio = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const makePortfolio = (portfolioData: portfolioContents) => {
        axios
          .post(
            "http://15.164.193.190:8080/auth/portfolio",
            {
              title: portfolioData.title,
              userId: 11,
            },
            {
                headers: {
                  "Content-type": "application/json",
                  Accept: "application/json",
                  Authorization: `${localStorage.getItem("token")}`,
                },
              }
          )
          .then((res) => {
            console.log(res);
            localStorage.setItem("token", res.headers.authorization);
          })
          .catch((res) => {
            console.log("Error!");
          });
      };
    const submitHandler = (e:any) => {
        e.preventDefault();
        const portData = {
            title: title,
            desc: desc
        }
        makePortfolio(portData);
        console.log(portData);
    }

    const titleChangeHandler = (e:any) =>{
        setTitle(e.target.value);
    }
    const descChangeHandler = (e:any) =>{ 
        setDesc(e.target.value);
    }



    return(
        <>
        <div className="background">
            <form onSubmit={submitHandler}>
                <div className="title">포트폴리오 제목</div>
                <input className="title_input" type="text" placeholder="20자 이내로 포트폴리오 제목을 작성해주세요!" onChange={titleChangeHandler}></input>
                <div className="desc">포트폴리오 상세 설명</div>
                <textarea className="desc_input"  placeholder="50자 이내로 포트폴리오에 대한 상세 설명을 작성해주세요!" onChange={descChangeHandler} ></textarea>
                <div className="edit_div">
                    <button className="cancle">취소</button>
                    <button className="save" onClick={(e) => submitHandler}>저장</button>
                </div>
            </form>           
        </div>
        <style jsx>{`
            .title, .desc {
                font-size: 25px;
                font-weight:500;
                margin-bottom:10px;             
            }

            .title_input{
                width:100%;
                height: 50px;
                border-radius:10px;
                margin-bottom:30px;
                padding-left: 20px;
                font-size:20px;
            }
            .desc_input{
                width:100%;
                height: 250px;
                border-radius:10px;
                margin-bottom:40px;
                padding-left: 20px;
                padding-top:20px;
                font-size:20px;
                border:2px solid black;
            }

            button{
                background-color: #BCC4DA;
                color:white;
                font-size:18px;
                font-weight:600;
                border-radius:10px;
                border: 0px;
                padding : 10px 30px;
                width: 12%;
                margin-bottom:10px;
                box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
            }

            button:hover{
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: box-shadow 0.1s linear;
            }

            .edit_div{
                display:flex;
                flex-direction:row;
                justify-content:center;
                width: 100%;
            }

            .cancle{
                padding: 15px 30px;
                background-color:#B6BDCD;
                margin-right:10px;
            }
            .save{
                padding: 15px 30px;
                background-color:#324A86;
            }


        `}</style>
        
        
        </>
    );
}

export default MakePortfolio;