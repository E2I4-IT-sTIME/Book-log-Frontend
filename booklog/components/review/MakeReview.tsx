import axios from "axios";
import router from "next/router";
import InputReview from "./InputReview";

interface reviewContents {
    title : string,
    book_name : string,
    time : Date,
    content : string
}

const MakeReview = () => {
    const saveReveiwData  = (enteredData: reviewContents) => {
        const reviewData  = {
            ...enteredData
        }
        makeReview(reviewData);
    }

    const makeReview = async (portfolioData: reviewContents) => {
        console.log("함수 실행");
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/review",
                method: 'post',
                data : portfolioData,
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                withCredentials:true,
                Authorization: `${localStorage.getItem("token")}`
                }       
            })
            if(res.status == 200){
                console.log(res);
                alert("서평이 생성되었습니다 !");
                router.push("/review");
            }
        } catch(err) {
            console.log(err);  
        }
    };
    

    return <InputReview onSavedata={saveReveiwData}/>
}

export default MakeReview;