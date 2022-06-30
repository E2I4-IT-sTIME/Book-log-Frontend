import NavBar from ".//NavBar";
import Footer from ".//Footer";

export default function Layout(props: any) {
  return (
    <>
      <NavBar />
      <div className="content">{props.children}</div>
      <Footer />
      <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next{
        width: 100%;
        height: 100%;
        margin: 0;
      }
      div#__next > div {
        height: auto;
        min-height: calc(100%- 130px);
      }
    `}</style>
    </>
  );
}
