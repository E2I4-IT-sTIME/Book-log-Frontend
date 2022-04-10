const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="link">
          <div className="block">Mobile app</div>
          <div className="block">Company</div>
          <div className="block">Help desk</div>
          <div className="block">Blog</div>
          <div className="block">Resources</div>
        </div>
        <div className="icon">
          <img />
          <img />
          <img />
          <img />
        </div>
        <div>© Photo, Inc. 2021. We love our users!</div>
      </div>
      <style jsx>{`
        .footer {
          height: 50px;
          border-top: 1px solid black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .block{
          margin: 0px 10px;
        }
        .link {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </>
  );
}

export default Footer;