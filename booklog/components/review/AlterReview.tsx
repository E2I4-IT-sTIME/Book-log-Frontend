import axios from "axios";
import router from "next/router";
import InputReview from "./InputReview";

interface reviewContents {
    title : string,
    book_name : string,
    time : Date,
    content : string
}

const AlterReview = (props:any) =>{
    const cardId = props.id;
    
    let beforeRev = {
        title : "기존 서평제목",
        book_name : "기존 책제목",
        time : "2022-02-21",
        content : "기존 내용"
    }

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
                let time = beforeData.time;
                beforeRev = {
                    title : title,
                    book_name : book_name,
                    time : time,
                    content : content
                }
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
                router.push("/review");
            }
        } catch(err) {
            console.log(err);  
        }
    };
    return <InputReview onSavedata={saveReviewData} beforeRev={beforeRev}/>
}

export default AlterReview;