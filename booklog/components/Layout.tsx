import NavBar from ".//NavBar";
import Footer from ".//Footer";
import { ChakraProvider } from "@chakra-ui/react";

export default function Layout(props: any) {
  return (
    <ChakraProvider>
      <NavBar />
      <div>{props.children}</div>
      <Footer />
    </ChakraProvider>
  );
}
