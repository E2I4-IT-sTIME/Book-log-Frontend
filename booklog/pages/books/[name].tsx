import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Detail() {
  const router = useRouter();
  //   const [hi, setHi] = useState("");
  //   useEffect(() => {
  //     setHi(router.query.name);
  //   }, [router]);
  console.log(router.query.name);
  return "detail";
}
