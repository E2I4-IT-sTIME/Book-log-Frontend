import { useState } from "react";
import MakePortfolio from "./MakePortfolio";
import PortfolioList from "./PortfolioList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isEditState, isMakeState } from "../../states/recoilBookPortfolio";
import AlterPortfolio from "./AlterPortfolio";
import router from "next/router";

const Bookportfolio = () => {
    const [isEdit, setIsEdit] = useRecoilState<boolean>(isEditState);
    const [isMake, setIsMake] = useRecoilState<boolean>(isMakeState); //make상태가 아니면 alter상태다.

    let username = "도르마무";
    let big_text = isEdit ? "Edit " : username + "'s ";
    let sub_text = isEdit ? "포트폴리오를 편집해보세요 ! " :  "나만의 독서 포트폴리오";

    const card = {
        title : "독서 동아리 포트폴리오",
        content : "샘플 포트폴리오 상세 설명 포트폴리오 상세 설명 포트폴리오 상세 설명 포트폴리오 상세 설명 포트폴리오 상세"
      }
    
    let portfolio_arr: any[] = [card, card, card, card, card, card, card];

    const onChangeEdit = () => {
        setIsEdit(true);
        if(isEdit == true) setIsEdit(false);
    }

    const onChakeMake = () =>{
        setIsMake(true);
        router.push("/portfolio/new");
    }

    const OnCancle = () => {
        setIsMake(false);
        setIsEdit(false);
    }
    
    return (
        <>
        <div className="background">
            <div className="main_div">
                <div className="article">
                    <div className="title">
                        <div className="big_text" > <span className={`${isEdit? 'textcolor' : ''} `}>{big_text}</span> Portfolio.</div>
                        <div className="small_text">{sub_text}</div>
                    </div>
                    <hr />
                    <div className="buttons">
                        <button onClick={onChakeMake}>+ 만들기</button>
                        <button onClick={onChangeEdit}>편집하기</button>
                    </div>
                </div>
                <div className="content">
                    <PortfolioList data={portfolio_arr} />
                </div>

            </div>
            {isEdit ? 
                <div className="edit_div">
                    <button className="cancle" onClick={OnCancle}>취소</button>
                    <button className="save">저장</button>
                </div>
            : null}
        </div>
        <style jsx>{`
            .background {
                background-color:#F7F8FC;
                width:100%;
                height:100%;
                min-height: calc(100vh - 130px);
            }
            .main_div{
                display:flex;
                flex-direction:column;
                width:80%;
                height:100%;
                min-height: calc(100vh - 130px);
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

            .textcolor{
                color:rgba(136, 190, 228, 1);
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
                min-width:150px;
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

