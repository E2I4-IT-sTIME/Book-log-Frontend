import { useRecoilState } from "recoil";
import { isEditState } from "../../states/recoilBookReview";

const ReviewCard = (props:any) =>{
    const [isEdit, setIsEdit] = useRecoilState<boolean>(isEditState);
    return(
        <>
            <div className="background">
                <div className="header">
                    <div className="title">{props.title}</div>
                    <div className="desc">
                        <div className="text">{props.text}</div>
                        <div className="time">{props.time}</div>
                    </div>
                </div>
                <div className="content">
                    {props.content}
                    {isEdit ?  <div className="btns"><button className="del">삭제</button><button className="alter">수정</button></div> : null}  
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
                }

                .background:hover{
                    box-shadow: 5px 5px gray;
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
                }   

                .btns {
                    display:flex;
                    justify-content: flex-end;
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