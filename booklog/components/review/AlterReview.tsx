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

    const [beforeRev, setBeforeRev] = useState({
        title : "기존 서평제목",
        book_name : "기존 책제목",
        content : "기존 내용"
    })
    

    const saveReviewData  = (enteredData: reviewContents) => {
        const reveiwData  = {
            ...enteredData
        }
        alterReview(reveiwData);
    }

    const beforeReview = async () => {
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/review/" + cardId,
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
                let title = beforeData.title;
                let content = beforeData.content;
                let book_name = beforeData.book_name;
                setBeforeRev({
                    title : title,
                    book_name : book_name,
                    content : content
                });
            }
        } catch(err) {
            console.log(err);  
        }
    };

    beforeReview();

    const alterReview = async (reviewData: reviewContents) => {
        console.log("함수 실행");
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/review/" + cardId,
                method: 'post',
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
    return <InputReview onSavedata={saveReviewData} beforeRev={beforeRev}/>
}

export default AlterReview;