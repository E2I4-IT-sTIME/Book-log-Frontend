import NavBar from ".//NavBar";
import Footer from ".//Footer";

export default function Layout(props: any) {
  return (
    <>
      <NavBar />
      <div className="content">{props.children}</div>
      <Footer />
      <style global jsx>
        {`
          html, body, #__next{
          height: 100%;
          width: 100%;
          margin:0;
          }
        `}
      </style>

    </>
  );
}
