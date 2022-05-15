import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import title from "./Img/frog.png";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      {/* public 디렉토리 안에 있는 파일 그냥 파일명으로 사용가능 */}
      <div>
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>홈</a>
        </Link>
        <Link href="/meeting">
          <a className={router.pathname === "/meeting" ? "active" : ""}>
            독서모임
          </a>
        </Link>
        <Link href="/community">
          <a className={router.pathname === "/community" ? "active" : ""}>
            커뮤니티
          </a>
        </Link>
        <Link href="/portfolio">
          <a className={router.pathname === "/portfolio" ? "active" : ""}>
            포트폴리오
          </a>
        </Link>
        <Link href="/sign">
          <a className={router.pathname === "/sign" ? "active" : ""}>로그인</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
