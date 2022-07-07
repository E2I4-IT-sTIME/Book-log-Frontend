const PortfolioCard = (props: any) => {
    return (
        <>
        <div className="card">
            <div className="title">{props.title}</div>
            <div className="sub">{props.sub}</div>
        </div>
        <style jsx>{`
        .card{
            background-color:#E4EAF5;
            width:31%;
            height:200px;
            border-radius: 0px 20px 0px 20px;
            box-shadow: 5px 5px #E5E5E5;
            margin-right: 2.3%;
            margin-bottom: 30px;
        } 
        .title{
            color:#324A86;
            font-size: 25px;
            font-weight:600;
            padding : 15px 10px;
            margin : 0 10px;
            border-bottom: 3px solid gray;
        }
        .sub{
            color:#324A86;
            font-size: 16px;
            padding : 10px 10px;
            margin : 0 10px;
        }
        .card:hover{
            background-color:#D8E3FC;
            box-shadow: 5px 5px gray;
        }
        `}</style>
    </>

    );
}

export default PortfolioCard;

