interface LayoutProps {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: LayoutProps) {
  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>{`
        button {
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
