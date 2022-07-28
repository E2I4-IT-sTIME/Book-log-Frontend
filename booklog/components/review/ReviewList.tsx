import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isTotalState } from "../../states/recoilBookReview";
import { userIndexState } from "../../states/recoilUserIndex";
import ReviewCard from "./ReviewCard";

const ReviewList = (props:any) => {
    const router = useRouter();
    const port_id = router.query.port_id;
    const [isTotal, setIsTotal] = useRecoilState<boolean>(isTotalState);
    const [userIndex, setUserIndex] = useRecoilState<String>(userIndexState);
    const [review_arr, setReview_arr] = useState(props.data);

    let search_input = props.search_input;

    useEffect(() =>{
         LookupHandler();        
    }, [search_input]);

    const LookupHandler = async() => {
        console.log("함수 실행");
        try {
        let res = await axios({
            url: "http://15.164.193.190:8080/auth/user/" + userIndex + "/portfolios/" + port_id,
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
            setReview_arr(props.data);
            console.log(err);  
        }
    }

    return (
        <>
            <div className="background" >
                {review_arr.length == 0 ? null :
                review_arr
                .filter((val:any)=>{
                    if(val.title.includes(search_input)) return val;
                })
                .map((ele:any) => {
                    let title = ele.title;
                    let book_name = ele.book_name;
                    let id = ele.review_id;
                    let content = ele.content;
                    return <ReviewCard title={title} book_name={book_name} content={content} key={id} id={id} />
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