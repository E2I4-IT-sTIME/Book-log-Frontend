import axios from "axios";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isAddState, isEditState, isMakeState, isTotalState, profTitleState } from "../../states/recoilBookReview";
import ReviewList from "./ReviewList";
import TotalReviewList from "./TotalReviewList";

const BookReview = () => {
    const router = useRouter();
    const port_id = router.query.port_id;
    let short_title = "";


    const [profTitle, setProfTitle] = useRecoilState<string>(profTitleState);
    const [isReviewEdit, setIsReviewEdit] = useRecoilState<boolean>(isEditState);
    const [isReviewMake, setIsReviewMake] = useRecoilState<boolean>(isMakeState);
    const [isTotal, setIsTotal] = useRecoilState<boolean>(isTotalState);
    const [isAdd, setIsAdd] = useRecoilState<boolean>(isAddState);

    useEffect(()=>{
        setIsTotal(false);
        setIsReviewEdit(false);
        setIsAdd(false);
    },[]);

    const card = {
        id: 1,
        title: "해리포터는 역시 재밌다.",
        book_name: "해리 포터와 마법사의 돌| J. K. 롤링",
        time: "2022.07.04 화 05:05 pm",
        content: "해리포터를 정말 오랜만에 봤다. 영화로 보는 것과 책으로 보는 것은 정말 다르다. 재밌다. 서평 내용 미리보기 서평 내용 미리보기 서평 내용 미리보기 서평 내용 미. 정말 오랜만에 봤다. 영화로 보는 것과 책으로 보는 것은 정말 다르다. "
    }
    let review_arr: any[] = [card, card, card, card];

    const onChangeEdit = () => {
        if(isTotal){
            setIsAdd(true);
            return;
        } 
        setIsReviewEdit(true);
        if(isReviewEdit) setIsReviewEdit(false);
    }

    const onChangeTotal = () =>{
        if(isTotal){
            setIsReviewMake(true);
            router.push(`/portfolio/${port_id}/review/new`);
        }else{
            setIsTotal(true);
            setIsReviewEdit(false);
        }
    }

    const OnCancle = () => {
        setIsReviewMake(false);
        setIsReviewEdit(false);
        setIsTotal(false);
        setIsAdd(false);
    }

    if(profTitle.length >= 10){
        short_title = profTitle.slice(0,10) + "...";
    }else {
        short_title = profTitle;
    }

    return(
        <>      
        <div className="background">
            <div className="main_div">
                <div className="article">
                    <div className="title">
                        <div className="big_text" >{!isTotal ? short_title : "나의 전체 서평 목록"}</div>
                    </div>                  
                </div>
                <hr />
                <div className="content">
                    <div className="search">
                        <form><input type="text" className="text" placeholder="서평 검색하기"></input></form>
                        <div className="buttons">
                            <button onClick={onChangeEdit}>{isTotal ? "추가하기" : "편집하기"}</button>
                            <button onClick={onChangeTotal}>{!isTotal ? "서평목록" : "+새 서평"}</button>
                        </div>
                    </div>
                    <div className="cards">{isTotal ? <TotalReviewList/> : <ReviewList data={review_arr}/>}</div>                  
                </div>
            </div> 
            {isReviewEdit || isTotal ? 
                <div className="edit_div">
                    <button className="cancle" onClick={OnCancle}>취소</button>
                    <button className="save">저장</button>
                </div>
            : null}
        </div>
        <style jsx>{`
            .background {
                background-color:#E4EAF5;
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
            }
            .article{
                display:flex;
                flex-direction:row;
                padding: 20px 0;  
                position: relative;      
            }
            hr {
               width:100%;
               height: 2px;
               background-color: #324A86;
            }
            .title{
                width:100%;
            }
            .big_text{
                color:#324A86;
                font-size: 80px;
                font-weight: 600;
            }

            .content{
                width: 100%;
                padding: 20px 0 ;
            }

            .search {               
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 60px;
                margin-bottom: 15px;
            }
            form {
                width:70%;
            }

            .cards{
                width: calc(100% + 50px);
            }

            .text{
                width: 97%;
                height: 50px;
                border: 0px;
                border-radius: 10px;
                padding-left:3%;
                font-size: 20px;
            }

            .buttons{
                display:flex;
                justify-content: flex-end;
                width:30%;
            }
            button{
                background-color: #BCC4DA;
                color:white;
                font-size:18px;
                font-weight:600;
                border-radius:10px;
                border: 0px;
                padding : 10px 30px;
                width: 42%;
                min-width:135px;
                margin-bottom:10px;
                margin-left:30px;
                box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
            }
            button:hover{
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: box-shadow 0.1s linear;
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

export default BookReview;