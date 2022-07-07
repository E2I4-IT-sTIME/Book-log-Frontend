import { useState } from "react";
import PortfolioList from "./PortfolioList";

const Bookportfolio = () => {
    const [isEdit, setIsEdit] = useState(false);

    let username = "Euna";
    let big_text = isEdit ? "Edit " : username + "'s ";

    const onChangeEdit = () => {
        setIsEdit(true);
        if(isEdit == true) setIsEdit(false);
    }
    
    return (
        <>
        <div className="background">
            <div className="main_div">
                <div className="article">
                    <div className="title">
                        <div className="big_text">{big_text} Portfolio.</div>
                        <div className="small_text">나만의 포트폴리오</div>
                    </div>
                    <hr />
                    <div className="buttons">
                        <button>+ 만들기</button>
                        <button onClick={onChangeEdit}>편집하기</button>
                    </div>
                </div>
                <div className="content">
                    <PortfolioList />
                </div>

            </div>
            {isEdit ? 
                <div className="edit_div">
                    <button className="cancle">취소</button>
                    <button className="save">저장</button>
                </div>
            : null}
        </div>
        <style jsx>{`
            .background {
                background-color:#F7F8FC;
                width:100%;
                height:100%;
            }
            .main_div{
                display:flex;
                flex-direction:column;
                width:80%;
                margin : 0 5%;
                padding-left : 5%;
                border-left: 5px solid #324A86;
            }
            .article{
                display:flex;
                flex-direction:row;
                padding: 20px 0;  
                position: relative;      
            }
            hr {
               position: absolute;
               top: 93%;
               left:-20%;
               width:132%;
               height: 2px;
               background-color: #324A86;
            }
            .title{
                width:80%;
            }
            .big_text{
                color:#324A86;
                font-size: 80px;
                font-weight: 600;
            }
            .small_text{
                color:#324A86;
                font-size: 30px;
                font-weight: 600;
            }
            .buttons{
                display:flex;
                flex-direction:column;
                align-items: flex-end;
                justify-content:flex-end;
                width:20%;
            }
            button{
                background-color: #BCC4DA;
                color:white;
                font-size:18px;
                font-weight:600;
                border-radius:10px;
                border: 0px;
                padding : 10px 30px;
                width: 50%;
                margin-bottom:10px;
                box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
            }
            button:hover{
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: box-shadow 0.1s linear;
            }

            .content{
                width: calc(100% + 20px);
                padding: 20px 0 ;
            }
            
            .edit_div{
                position: fixed;
                bottom: 10%;
                left:40%;
                display:flex;
                flex-direction:row;
                width: 20%;;
            }

            .cancle{
                padding: 15px 30px;
                background-color:#B6BDCD;
                margin-right:10px;
            }
            .save{
                background-color:#324A86;
            }
        
        `}</style>
        </>
    );
}

export default Bookportfolio;