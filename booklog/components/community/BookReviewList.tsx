import axios from "axios";
import { useEffect, useState } from "react";
import ReviewCard from "../review/ReviewCard";

const BookREviewList = (props:any) => {
    const [review_arr, setReview_arr] = useState([]);
    const book_name = props.book_name;

    useEffect(() =>{
        LookupHandler();
    }, []);

    const LookupHandler = async () => {
        console.log("전체서평보기");
        try {
        let res = await axios({
            url: "http://15.164.193.190:8080/community",
            method: 'get',
            headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            withCredentials:true,
            }       
        })
        if(res.status == 200){
            console.log(res);
            setReview_arr(res.data);
        }
        } catch(err){
            console.log(err);  
        }
    };

    let cnt = 0;

    return (
        <>
            <div className="background" >
                {review_arr.length == 0 ? null:
                review_arr
                .filter((val:any)=>{
                    if(val.book_name.includes(book_name)) return val;
                })       
                .map((ele:any) => {
                    let title = ele.title;
                    let book_name = ele.book_name;
                    let id = ele.review_id;
                    let content = ele.content;
                    cnt++;
                    return <ReviewCard title={title} book_name={book_name} content={content} key={id} id={id} />
                })}
                {cnt==0 ? <div className="text">이 책으로 작성된 서평이 없네요 😥</div> : null}
            </div>
            <style jsx>{`
                .background{
                display:flex;
                flex-direction:row;
                flex-wrap: wrap;
                justify-content: flex-start;
                width:100%;
                }    
                .text{
                    margin-top: 20px;
                    font-size: 1.2rem;
                    font-weight: bold;
                } 
             `}</style>
        </>
    );
}

export default BookREviewList;