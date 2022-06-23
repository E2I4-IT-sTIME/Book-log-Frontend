import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "./Img/logo_white.png";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <div className="container">
        <div className="inner">
          <div className="first-box">
            <Link href="/">
              <a className={router.pathname === "/" ? "active" : "non-active"}>
                <Image src={logo} className="logo" width={130} height={25} />
              </a>
            </Link>
          </div>
          <div className="second-box">
            <Link href="/portfolio">
              <a
                className={
                  router.pathname === "/portfolio" ? "active" : "non-active"
                }
              >
                PORTFOLIO
              </a>
            </Link>
            <Link href="/meeting">
              <a
                className={
                  router.pathname === "/meeting" ? "active" : "non-active"
                }
              >
                CLUB
              </a>
            </Link>
            <Link href="/community">
              <a
                className={
                  router.pathname === "/community" ? "active" : "non-active"
                }
              >
                COMMUNITY
              </a>
            </Link>
          </div>
        </div>

        <div className="third-box">
          <Link href="/sign">
            <a
              className={router.pathname === "/sign" ? "active" : "non-active"}
            >
              LOG IN
            </a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        nav {
          gap: 10px;
          width: 100%;
          padding-top: 10px;
          padding-bottom: 10px;
          background-color: #324a86;
        }
        nav a {
          text-decoration: none;
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: white;
        }
        .non-active {
          color: #88a0dc;
        }
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .inner {
          display: flex;
          align-items: center;
        }
        .first-box {
          margin-left: 30px;
        }
        .second-box {
          margin-left: 30px;
          display: flex;
          gap: 20px;
        }
        .third-box {
          margin-right: 40px;
        }
      `}</style>
    </nav>
  );
}
