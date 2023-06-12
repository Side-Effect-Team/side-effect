import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

import { Wrapper, Contents, IconBox, ColumnBox, Title, Column } from "./styled";

export default function Footer() {
  return (
    <Wrapper>
      <Contents>
        <IconBox>
          <Link href="/">
            <Image
              src="/images/mainLogo.svg"
              alt="사이드이펙트 로고"
              width={100}
              height={50}
              priority
            />
          </Link>
          <Link href="https://github.com/Side-Effect-Team">
            <BsGithub size={50} />
          </Link>
        </IconBox>
        <ColumnBox>
          <Column>
            <Title>팀</Title>
            <Link href="https://github.com/Side-Effect-Team" target="_blank">
              팀 소개
            </Link>
            <Link
              href="https://github.com/Side-Effect-Team/side-effect-backend"
              target="_blank"
            >
              백엔드 개발진
            </Link>
            <Link
              href="https://github.com/Side-Effect-Team/side-effect-frontend"
              target="_blank"
            >
              프론트엔드 개발진
            </Link>
          </Column>
          <Column>
            <Title>고객지원</Title>
            <Link
              href="https://github.com/Side-Effect-Team/side-effect-frontend/issues"
              target="_blank"
            >
              이용 문의
            </Link>
            <Link
              href="https://github.com/Side-Effect-Team/side-effect-frontend/issues"
              target="_blank"
            >
              버그 제보
            </Link>
            <Link
              href="https://github.com/Side-Effect-Team/side-effect-frontend/issues"
              target="_blank"
            >
              컨트리뷰션
            </Link>
          </Column>
        </ColumnBox>
      </Contents>
    </Wrapper>
  );
}
