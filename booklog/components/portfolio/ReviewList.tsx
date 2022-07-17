import ReviewCard from "./ReviewCard";

const ReviewList = () => {
    const card = {
        id: 1,
        title: "해리포터는 역시 재밌다.",
        text: "해리 포터와 마법사의 돌| J. K. 롤링",
        time: "2022.07.04 화 05:05 pm",
        content: "해리포터를 정말 오랜만에 봤다. 영화로 보는 것과 책으로 보는 것은 정말 다르다. 재밌다. 서평 내용 미리보기 서평 내용 미리보기 서평 내용 미리보기 서평 내용 미. 정말 오랜만에 봤다. 영화로 보는 것과 책으로 보는 것은 정말 다르다. "
    }
    const review_arr: any[] = [card, card, card, card,];
    return (
        <>
            <div className="background" >
                {review_arr.map((ele) => {
                    let id = ele.id;
                    let title = ele.title;
                    let text = ele.text;
                    let time = ele.time;
                    let content = ele.content;
                    return <ReviewCard title={title} text={text} time={time} content={content} key={id} />
                })}
            </div>
            <style jsx>{`
                .background{
                display:flex;
                flex-direction:row;
                flex-wrap: wrap;
                justify-content: flex-start;
                width:100%;
                }     
             `}</style>
        </>
    );
}

export default ReviewList;