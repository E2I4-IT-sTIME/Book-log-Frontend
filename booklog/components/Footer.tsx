export default function Footer(){
  return (
    <>
      <div className="footer">
        <div className="link">
          <div className="block"><a href="#">Mobile app</a></div>
          <div className="block"><a href="#">Company</a></div>
          <div className="block"><a href="#">Help desk</a></div>
          <div className="block"><a href="#">Blog</a></div>
          <div className="block"><a href="#">Resources</a></div>
        </div>
        <div className="desc">© Photo, Inc. 2021. We love our users!</div>
      </div>
      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          height: 80px;
          width: 100%;

          border-top: 1px solid black;
          position:relative;
          transform : translateY(-100%);
          background-color: #324a86;

          font-size:18px;
          font-weight:600;
          text-align: center;
          color: #88a0dc;
        }
        a {
          text-decoration: none; 
          color: inherit; 
        }
        a:hover {
          color: white;
        }
        .block {
          width:100%;
          margin: 0 10px;
          white-space:nowrap;
        }
        .link {
          display: flex;
          flex-direction: row;
          width:50%;
          min-width: 50%;
        }
        .desc{
          margin-top: 3px;
        }
      `}</style>
    </>
  );
}