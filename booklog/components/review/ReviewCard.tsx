import axios from "axios";
import router, { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { isAddState, isEditState, isMakeState, isTotalState } from "../../states/recoilBookReview";

const ReviewCard = (props:any) =>{
    const [isTotal, setIsTotal] = useRecoilState<boolean>(isTotalState);
    const [isReviewEdit, setIsReviewEdit] = useRecoilState<boolean>(isEditState);
    const [isReviewMake, setIsReviewMake] = useRecoilState<boolean>(isMakeState); //make상태가 아니면 alter상태다.
    const [isAdd, setIsAdd] = useRecoilState<boolean>(isAddState);

    const router = useRouter();
    const port_id = router.query.port_id;
    const cardId = props.id;

    const delelteReview = async (e:any) =>{
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/review/" + cardId,
                method: 'delete',
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                withCredentials:true,
                Authorization: `${localStorage.getItem("token")}`
                }       
            })
            if(res.status == 200){
                console.log(res);
                alert("서평이 삭제되었습니다 !");
                setIsReviewEdit(false);
                location.reload();
            }
        } catch(err) {
            console.log(err);  
        }
    }

    const alterReview = () => {
        setIsReviewMake(false);
        router.push(`/portfolio/${port_id}/review/${cardId}`);
    }

    const AddReview = async() =>{
        try {
            let res = await axios({
                url: "http://15.164.193.190:8080/auth/" + port_id + "/review/" + cardId,
                method: 'post',
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                withCredentials:true,
                Authorization: `${localStorage.getItem("token")}`
                }       
            })
            if(res.status == 200){
                alert("서평이 추가되었습니다 !");
                setIsTotal(false);
                setIsReviewEdit(false);
                router.push(`/portfolio/${port_id}/review`);
            }
        } catch(err) {
            console.log(err);  
            alert("이미 추가된 서평입니다 !");
        }
    }
    
    return(
        <>
            <div className="background">
                <div className="header">
                    <div className="title">{props.title}</div>
                    <div className="desc">
                        <div className="text">{props.book_name}</div>
                        <div className="time">{props.createDate}</div>
                    </div>
                </div>
                <div className="content">
                    {props.content}
                    {isAdd ? <div className="btns" ><button className="alter" onClick={AddReview}>추가하기</button></div> : null}
                    {isReviewEdit ?  <div className="btns"><button className="del" onClick={delelteReview}>삭제</button><button className="alter" onClick={alterReview}>수정</button></div> : null}  
                </div>                         
            </div>
            <style jsx>{`
                .background {
                    display:flex;
                    flex-direction: column;                   
                    width:47%;
                    height: 200px;
                    margin-bottom: 30px;
                    margin-right: 30px;
                    border-radius: 10px;
                }

                .background:hover{
                    box-shadow: 5px 5px #D7DBE5;
                    filter:brightness(120%);
                }

                .header {
                    display: flex;
                    flex-direction: column;
                    align-items:center;
                    width: 100%;
                    background-color: #324A86;
                    height: 35%;
                    border-radius: 10px 10px 0 0;
                }

                .title{
                    width:95%;
                    color: white;
                    font-size : 20px;
                    font-weight: 600;
                    height:60%;
                    margin-left: 5%;
                    margin-top: 10px;
                }
                .desc{
                    width:90%;
                    height:40%;
                    margin: 0 5%;
                    display:flex;
                    justify-content: space-between;
                    color : #B0ADAD;
                    font-size: 12px;
                }
                .content{
                    border-radius: 0 0 10px 10px;
                    padding: 2% 5%;
                    font-size: 16px;
                    color: #505050;
                    background-color: white;
                    height: 61%;
                    position:relative;
                }   

                .btns {
                    position:absolute;
                    bottom:8px;
                    right:5px;
                }

                button{
                    border:0px;
                    border-radius:10px;
                    color:white;
                    font-size:18px;
                    font-weight:600;
                    padding: 7px 18px;
                    margin-right:5px;
                }
                .del{
                    background-color:#F86258;
                }
                .alter{
                    background-color:#88BEE4;
                }            
            `}</style>
        </>
    );
}

export default ReviewCard;