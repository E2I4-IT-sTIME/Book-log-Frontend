import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isTotalState } from "../../states/recoilBookReview";
import { userIndexState } from "../../states/recoilUserIndex";
import ReviewCard from "./ReviewCard";

const TotalReviewList = (props:any) => {
    const router = useRouter();
    const port_id = router.query.port_id;
    const [isTotal, setIsTotal] = useRecoilState<boolean>(isTotalState);
    const [userIndex, setUserIndex] = useRecoilState<String>(userIndexState);
    const [review_arr, setReview_arr] = useState([]);
    let search_input = props.search_input;

    useEffect(() =>{
        LookupHandler();
    }, [isTotal]);

    const LookupHandler = async () => {
        console.log("전체서평보기");
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

export default TotalReviewList;