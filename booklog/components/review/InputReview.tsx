import axios from "axios";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isMakeState, isTotalState } from "../../states/recoilBookReview";
import { userIndexState } from "../../states/recoilUserIndex";

const InputReview = (props:any) => {
    const router = useRouter();
    const port_id = router.query.port_id;
    const card_id = router.query.review_id;
    
    const [userIndex, setUserIndex] = useRecoilState<String>(userIndexState);
    const [isTotal, setIsTotal] = useRecoilState<boolean>(isTotalState);
    const [isReviewMake, setIsReviewMake] = useRecoilState<boolean>(isMakeState); //make상태가 아니면 alter상태다.
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [book_name, setBook_name] = useState("");

    const beforeReview = async () => {
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/user/"  + userIndex + "/review/"+ card_id,
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
                setTitle(beforeData.title);
                setContent(beforeData.content);
                setBook_name(beforeData.book_name);
            }
        } catch(err) {
            console.log(err);  
        }
    };

    if(!isReviewMake) {
        useEffect(()=>{beforeReview();},[]);
    }

    const submitHandler = (e:any) => {
        e.preventDefault();
        const reviewData = {
            title: title,
            book_name:book_name,
            content: content,
        }
        props.onSavedata(reviewData);
    }

    const titleChangeHandler = (e:any) =>{
        setTitle(e.target.value);
    }
    const contentChangeHandler = (e:any) =>{ 
        setContent(e.target.value);
    }
    const book_nameChangeHandler = (e:any) =>{ 
        setBook_name(e.target.value);
    }

    const onCancle = () =>{
        setIsTotal(false);
        setIsReviewMake(false);
        router.push(`/portfolio/${port_id}/review`);
    }

    const onClickSearchBtn = () => {
        const yes = confirm("책 검색 페이지로 이동하시겠습니까 ?");
        if(yes) router.push("/community");        
    }

    return (
    <>
    <form className="background">
        <div className="title">서평 제목</div>
        <input type="text" className="review_input" onChange={titleChangeHandler} value={title}></input>
        <div className="title">책 제목</div>
        <div className="book_title">
            <input type="text" className="title_input" onChange={book_nameChangeHandler} value={book_name}></input>
            <div className="search_btn" onClick={onClickSearchBtn}>책 제목 검색</div>
        </div>
        <div className="title">서평 내용</div>
        <textarea className="content_input" onChange={contentChangeHandler} value={content}></textarea>
        <div className="edit_div">
                <button className="cancle" onClick={onCancle}>취소</button>
                <button className="save" onClick={submitHandler}>저장</button>
        </div>
    </form>

    <style jsx>{`  
    .background{
        display: flex;
        flex-direction:column;
    }
    .title{
        font-size: 25px;
        font-weight:500;
        margin-bottom:10px;      
    }
    .review_input{
        width: calc(100% - 10px);
        height:50px;
        border-radius:5px;
        margin-bottom: 10px;
        font-size : 20px;
        padding-left: 10px;
    }
    .book_title{
        display:flex;
        flex-direction:row;
    }
    .title_input{
        width: 40%;
        height:50px;
        border-radius:5px;
        margin-bottom: 10px;
        margin-right: 20px;
        font-size : 20px;
        padding-left: 10px;
    }
    .search_btn {
        width:15%;
        height: 60px;
        border-radius: 10px;
        background-color: #88BEE4;
        color: white;
        font-size: 25px;
        font-weight: 600;
        text-align: center;
        line-height:60px;
        cursor:pointer;
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
    }
    .search_btn:hover{
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.1s linear;
    }

    .content_input{
        width: calc(100% - 10px);
        height: 150px;
        border-radius:5px;
        margin-bottom: 30px;
        border: 2px solid black;
        font-size : 20px;
        padding:10px;
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

export default InputReview;