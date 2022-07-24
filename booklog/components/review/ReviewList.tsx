import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userIndexState } from "../../states/recoilUserIndex";
import ReviewCard from "./ReviewCard";

const ReviewList = (props:any) => {
    const [userIndex, setUserIndex] = useRecoilState<number>(userIndexState);
    const [review_arr, setReview_arr] = useState([props.data]);
    console.log(review_arr.length);

    useEffect(() =>{
        LookupHandler();
    }, []);

    const LookupHandler = async () => {
        console.log("함수 실행");
        try {
        let res = await axios({
            url: "http://15.164.193.190:8080/auth/user/" + userIndex + "/reviews",
            method: 'get',
            headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            withCredentials:true,
            Authorization: `${localStorage.getItem("token")}`
            }       
        })
        if(res.status == 200){
            console.log(res.data.reviewResList);
            let review_data = res.data.reviewResList;
            setReview_arr(review_data);
        }
        } catch(err){
            console.log(err);  
        }
    };
    return (
        <>
            <div className="background" >
                {review_arr.length == 0 ? null :
                review_arr.map((ele) => {
                    let title = ele.title;
                    let book_name = ele.book_name;
                    let createDate = ele.createDate;
                    let id = ele.review_id;
                    let content = ele.content;
                    return <ReviewCard title={title} book_name={book_name} createDate={createDate} content={content} key={id} id={id} />
                })}
            </div>
            <style jsx>{`
                .background{
                display:flex;
                flex-direction:row;
                flex-wrap: wrap;
                justify-content: flex-start;
                width:100%;
                }     
             `}</style>
        </>
    );
}

export default ReviewList;