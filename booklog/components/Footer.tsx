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
        <div>© Photo, Inc. 2021. We love our users!</div>
      </div>
      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50px;
          width: 100%;
          border-top: 1px solid black;
          position: absolute;
          bottom: 0px;
          padding: 10px 0;
        }
        .block {
          margin: 0 10px;
        }
        .link {
          display: flex;
          flex-direction: row;
          margin-bottom : 5px;
        }
      `}</style>
    </>
  );
}

export default Footer;