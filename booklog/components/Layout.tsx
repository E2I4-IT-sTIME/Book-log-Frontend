import NavBar from ".//NavBar";
import Footer from ".//Footer";

export default function Layout(props: any) {
  return (
    <>
      <NavBar />
      <div>{props.children}</div>
      {/* <Footer /> */}
    </>
  );
}
