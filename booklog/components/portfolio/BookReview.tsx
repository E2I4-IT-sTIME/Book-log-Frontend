import ReviewList from "./ReviewList";

const BookReview = () => {
    return(
        <>
        <div className="background">
            <div className="main_div">
                <div className="article">
                    <div className="title">
                        <div className="big_text" >독서 동아리 포트폴리오</div>
                    </div>                  
                </div>
                <hr />
                <div className="content">
                    <div className="search">
                        <form><input type="text" className="text" placeholder="서평 검색하기"></input></form>
                        <div className="buttons">
                            <button >편집하기</button>
                            <button >+ 서평보기</button>
                        </div>
                    </div>
                    <div className="cards"><ReviewList /></div>
                </div>
            </div> 
        </div>
        <style jsx>{`
            .background {
                background-color:#E4EAF5;
                width:100%;
                height:100%;
                min-height: calc(100vh - 130px);
            }
            .main_div{
                display:flex;
                flex-direction:column;
                width:80%;
                height:100%;
                min-height: calc(100vh - 130px);
                margin : 0 5%;
                padding-left : 5%;
            }
            .article{
                display:flex;
                flex-direction:row;
                padding: 20px 0;  
                position: relative;      
            }
            hr {
               width:100%;
               height: 2px;
               background-color: #324A86;
            }
            .title{
                width:100%;
            }
            .big_text{
                color:#324A86;
                font-size: 80px;
                font-weight: 600;
            }

            .content{
                width: 100%;
                padding: 20px 0 ;
            }

            .search {               
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 60px;
                margin-bottom: 15px;
            }
            form {
                width:70%;
            }

            .cards{
                width: calc(100% + 50px);
            }

            .text{
                width: 97%;
                height: 50px;
                border: 0px;
                border-radius: 10px;
                padding-left:3%;
                font-size: 20px;
            }

            .buttons{
                display:flex;
                justify-content: flex-end;
                width:30%;
            }
            button{
                background-color: #BCC4DA;
                color:white;
                font-size:18px;
                font-weight:600;
                border-radius:10px;
                border: 0px;
                padding : 10px 30px;
                width: 42%;
                margin-bottom:10px;
                margin-left:30px;
                box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
            }
            button:hover{
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: box-shadow 0.1s linear;
            }
        
        `}</style>
        </>
    );
}

export default BookReview;