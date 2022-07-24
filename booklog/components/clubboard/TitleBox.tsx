interface titleProps {
  name: string;
  onoff: boolean;
  tag: Array<string>;
  content: string;
}

export default function TitleBox(props: titleProps) {
  const { name, onoff, tag, content } = props;
  return (
    <div className="container">
      <div className="title-box">
        <div className="under-line" />
        <span className="title">{name}</span>
      </div>
      <span className="subtitle">{content}</span>
      <div className="tags">
        {tag.map((tag, index) => (
          <span className="tag" key={index}>
            #{tag}
          </span>
        ))}
        <span className="tag">{onoff ? "온라인 모임" : "오프라인 모임"}</span>
      </div>
      <style jsx>{`
        .container {
          display: inline-flex;
          flex-direction: column;
          gap: 5px;
          letter-spacing: -0.05;
        }
        .title-box {
          position: relative;
        }
        .title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #324a86;
          position: relative;
          top: 0%;
          left: 0%;
        }
        .under-line {
          background-color: #eeeef9;
          position: absolute;
          width: 100%;
          height: 60%;
          top: 30%;
          left: 2%;
          border-radius: 10px;
        }
        .subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          color: #324a86;
        }
        .tags {
          display: flex;
          flex-direction: row;
          gap: 10px;
          margin-top: 5px;
        }
        .tag {
          background-color: #324a86;
          padding: 5px 10px 5px 10px;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: white;
        }
      `}</style>
    </div>
  );
}
