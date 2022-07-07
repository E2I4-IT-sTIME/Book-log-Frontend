import { useState } from "react";

const BookReview = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    return(
    <>
        <div className="background">
            <div className="menu_bar">
                <div className="menu1">
                    <div>첨부</div>
                    <div>크기</div>
                    <div>글꼴</div>
                </div>
                <div className="menu2">
                    <div>B</div>
                    <div>I</div>
                    <div>U</div>
                    <div>T</div>
                    <div>T</div>
                </div>
                <div className="menu3">
                    <div>왼쪽정렬</div>
                    <div>중앙정렬</div>
                    <div>오른쪽정렬</div>
                </div>
            </div>
            <div className="title">
                
            </div>
            <hr/>
            <div className="desc">

            </div>
            <div>
                <div className="submit_button">완료</div>
            </div>
        </div>
        <style jsx>{`
            .background{
                display:flex;
                flex-direction:row;
            }
            .menu{
                display:flex;
                flex-direction:column;
            }
            
            
            
        
        `}</style>
    </>
    );
}


export default BookReview;