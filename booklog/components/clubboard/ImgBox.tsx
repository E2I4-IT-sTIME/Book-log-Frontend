interface imgProps {
  image: string;
}

export default function ImgBox(props: imgProps) {
  const { image } = props;
  return (
    <div className="container">
      <div className="outer-box" />
      <div className="inner-box" />
      <style jsx>{`
        .container div {
          background-image: url(${image});
          background-size: cover;
          background-position: 50%;
          border-radius: 100px;
        }
        .container {
          width: 400px;
          height: 400px;
          position: relative;
        }
        .outer-box {
          width: 100%;
          height: 100%;
          filter: brightness(80%);
        }
        .inner-box {
          width: 90%;
          height: 90%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          filter: brightness(100%);
          cursor: pointer;
          transition: all 0.25s;
        }
        .inner-box:hover {
          width: 95%;
          height: 95%;
        }
      `}</style>
    </div>
  );
}
