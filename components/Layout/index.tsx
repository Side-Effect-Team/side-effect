import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { Wrapper, MobileNavBar, MobileMenuItem } from "./styled";
import GlobalStyles from "@/styles/Global";
import { theme } from "@/styles/Theme";
import { breakPoints } from "@/styles/Media";
import Header from "../Header";
import Footer from "../Footer";
import Toast from "../Toast";
import { BOARD_LIST } from "../../enum";
import ScrollToTop from "../ScrollToTop";
import Head from "next/head";
import { useAppSelector } from "@/store/hooks";
import { handleAuth } from "../../utils/auth";
import { handleRefreshAccessToken } from "apis/UserAPI";

interface PropType {
  children: React.ReactNode;
}

const MOBILE_BOARD_LIST = [
  ...BOARD_LIST,
  {
    ID: 2,
    TITLE: "로그인",
    LINK: "/",
  },
];

interface MobileMenuProps {
  hide: boolean;
  handleClick: () => void;
}

export default function Layout({ children }: PropType) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { authenticated } = useAppSelector((state) => state.auth);
  console.log("authenticated", authenticated);

  const handleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // 뷰포트 width가 모바일 width 보다 커지면 모바일 메뉴 닫음
  const detectViewportWidth = () => {
    if (window.innerWidth > breakPoints.mobile) setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      window.addEventListener("resize", detectViewportWidth);

      return () => window.removeEventListener("resize", detectViewportWidth);
    }
  });
  // 새로고침시 액세스토큰이 휘발되기때문에 만약 로그인상태인데 새로고침을했다면 새로운 액세스토큰으로 갱신
  useEffect(() => {
    //유저가 로그인상태에서 새로고침을 하면 액세스토큰 갱신,로그인상태가 아닌상태에서 새로고침을했다면 갱신요청보내지않음.
    if (authenticated) {
      try {
        handleRefreshAccessToken();
        console.log(handleAuth.getToken());
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <title>사이드 이펙트 | 빠르게 프로젝트를 시작하세요</title>
      </Head>
      <Header handleMobileMenu={handleMobileMenu} />
      <ScrollToTop />
      <Toast />
      <MobileMenu hide={!mobileMenuOpen} handleClick={handleMobileMenu} />
      <Wrapper mobileMenuOpen={mobileMenuOpen}>{children}</Wrapper>
      <Footer />
    </ThemeProvider>
  );
}

function MobileMenu({ hide, handleClick }: MobileMenuProps) {
  return (
    <MobileNavBar hide={hide}>
      {MOBILE_BOARD_LIST.map((board) => {
        if (board.TITLE === "로그인") {
          return (
            <MobileMenuItem key={board.ID} onClick={handleClick}>
              <Link href={board.LINK}>{board.TITLE}</Link>
            </MobileMenuItem>
          );
        }
        return (
          <MobileMenuItem key={board.ID} onClick={handleClick}>
            <Link href={board.LINK}>{board.TITLE}</Link>
          </MobileMenuItem>
        );
      })}
    </MobileNavBar>
  );
}
