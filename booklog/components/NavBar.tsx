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
          <a className={router.pathname === "/" ? "active" : "non-active"}>
            홈
          </a>
        </Link>
        <Link href="/meeting">
          <a
            className={router.pathname === "/meeting" ? "active" : "non-active"}
          >
            독서모임
          </a>
        </Link>
        <Link href="/community">
          <a
            className={
              router.pathname === "/community" ? "active" : "non-active"
            }
          >
            커뮤니티
          </a>
        </Link>
        <Link href="/portfolio">
          <a
            className={
              router.pathname === "/portfolio" ? "active" : "non-active"
            }
          >
            포트폴리오
          </a>
        </Link>
        <Link href="/sign">
          <a className={router.pathname === "/sign" ? "active" : "non-active"}>
            로그인
          </a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          padding-top: 20px;
          padding-bottom: 10px;
        }
        nav a {
          text-decoration: none;
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        .non-active {
          color: black;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
