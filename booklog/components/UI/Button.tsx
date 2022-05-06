interface LayoutProps {
  children: React.ReactNode;
}

export default function Button({ children }: LayoutProps) {
  return (
    <>
      <div className="button">{children}</div>
      <style jsx>{`
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #605ec9;
          color: white;
          border: 0px;
          border-radius: 5px;
          width: 100%;
          height: 45px;
          margin: 10px 0px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
