import router, { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isMakeState } from "../../states/recoilBookReview";

const InputReview = (props:any) => {
    const router = useRouter();
    const port_id = router.query.port_id;
    
    const [isReviewMake, setIsReviewMake] = useRecoilState<boolean>(isMakeState); //make상태가 아니면 alter상태다.
    const [title, setTitle] = useState(isReviewMake ? "" : props.beforeRev.title);
    const [content, setContent] = useState(isReviewMake ? "" : props.beforeRev.content);
    const [book_name, setBook_name] = useState(isReviewMake ? "" : props.beforeRev.book_name);

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
        setIsReviewMake(false);
        router.push(`/portfolio/${port_id}/review`);
    }

    return (
    <>
    <form className="background">
        <div className="title">서평 제목</div>
        <input type="text" className="review_input" onChange={titleChangeHandler} value={title}></input>
        <div className="title">책 제목</div>
        <div className="book_title">
            <input type="text" className="title_input" onChange={book_nameChangeHandler} value={book_name}></input>
            <div className="search_btn">책 제목 검색</div>
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
        width:100%;
        height:50px;
        border-radius:5px;
        margin-bottom: 10px;
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
    }
    .content_input{
        width:100%;
        height: 150px;
        border-radius:5px;
        margin-bottom: 30px;
        border: 2px solid black;
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