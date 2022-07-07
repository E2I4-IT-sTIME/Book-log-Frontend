import PortfolioList from "./PortfolioList";

const Bookportfolio = () => {
    return (
        <>
        <div className="background">
            <div className="main_div">
                <div className="article">
                    <div className="title">
                        <div className="big_text">User's Portfolio.</div>
                        <div className="small_text">나만의 포트폴리오</div>
                    </div>
                    <hr />
                    <div className="buttons">
                        <button>+ 만들기</button>
                        <button>편집하기</button>
                    </div>
                </div>
                <div className="content">
                    <PortfolioList />
                </div>

            </div>
        </div>
        <style jsx>{`
            .background {
                background-color:#F7F8FC;
                width:100%;
                height:100%;
            }
            .main_div{
                display:flex;
                flex-direction:column;
                width:80%;
                margin : 0 5%;
                padding-left : 5%;
                border-left: 5px solid #324A86;
            }
            .article{
                display:flex;
                flex-direction:row;
                padding: 20px 0;  
                position: relative;      
            }
            hr {
               position: absolute;
               top: 93%;
               left:-20%;
               width:132%;
               height: 2px;
               background-color: #324A86;
            }
            .title{
                width:80%;
            }
            .big_text{
                color:#324A86;
                font-size: 80px;
                font-weight: 600;
            }
            .small_text{
                color:#324A86;
                font-size: 30px;
                font-weight: 600;
            }
            .buttons{
                display:flex;
                flex-direction:column;
                align-items: flex-end;
                justify-content:flex-end;
                width:20%;
            }
            button{
                background-color: #BCC4DA;
                color:white;
                font-size:18px;
                font-weight:600;
                border-radius:10px;
                border: 0px;
                padding : 10px 30px;
                width: 50%;
                margin-bottom:10px;
            }
            .content{
                width: calc(100% + 20px);
                padding: 20px 0 ;
            }
        
        `}</style>
        </>
    );
}

export default Bookportfolio;