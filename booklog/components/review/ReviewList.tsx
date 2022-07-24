import axios from "axios";
import { useEffect } from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = (props:any) => {
    let idx = 0;
    const userIndex = "1" //수정부분

    let review_arr: any[] = props.data;

    useEffect(() =>{
        LookupHandler();
    }, []);

    const LookupHandler = async () => {
        console.log("함수 실행");
        try {
        let res = await axios({
            url: "http://15.164.193.190:8080/api/user/" + userIndex + "/reviews",
            method: 'get',
            headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            withCredentials:true,
            Authorization: `${localStorage.getItem("token")}`
            }       
        })
        if(res.status == 200){
            console.log(res.data);
            let review_data = JSON.parse(res.data);
            review_arr = review_data;
        }
        } catch(err){
        console.log(err);  
        }
    };
    return (
        <>
            <div className="background" >
                {review_arr.map((ele) => {
                    let title = ele.title;
                    let book_name = ele.book_name;
                    let time = ele.time;
                    let content = ele.content;
                    idx++;
                    return <ReviewCard title={title} book_name={book_name} time={time} content={content} key={idx} id={idx} />
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