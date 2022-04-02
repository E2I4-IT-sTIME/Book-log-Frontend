interface LayoutProps {
  children: React.ReactNode;
}

export default function Card({ children }: LayoutProps) {
  return (
    <>
      <div className="card">{children}</div>
      <style jsx>{`
        .card {
          width: 500px;
          height: 600px;
          border: 1px solid black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}


