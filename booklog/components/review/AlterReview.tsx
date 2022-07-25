import axios from "axios";
import router, { useRouter } from "next/router";
import { useState } from "react";
import InputReview from "./InputReview";

interface reviewContents {
    title : string,
    book_name : string,
    content : string
}

const AlterReview = (props:any) =>{
    const router = useRouter();
    const port_id = router.query.port_id;
    const cardId = props.id;

    const saveReviewData  = (enteredData: reviewContents) => {
        const reveiwData  = {
            ...enteredData
        }
        alterReview(reveiwData);
    }

    const alterReview = async (reviewData: reviewContents) => {
        console.log("함수 실행");
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/review/" + cardId,
                method: 'patch',
                data : reviewData,
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                withCredentials:true,
                Authorization: `${localStorage.getItem("token")}`
                }       
            })
            if(res.status == 200){
                console.log(res);
                alert("서평이 수정되었습니다 !");
                router.push(`/portfolio/${port_id}/review`);
            }
        } catch(err) {
            console.log(err);  
        }
    };
    return <InputReview onSavedata={saveReviewData} idx={port_id}/>
}

export default AlterReview;