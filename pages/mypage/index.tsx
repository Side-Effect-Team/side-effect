import {
  Container,
  ContentsWrapper,
  TapMenu,
  TapWrapper,
} from "@/components/pages/mypage/styled";
import Profile from "@/components/pages/mypage/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { BoardCardProps } from "@/components/BoardCard";
import TabBoards from "@/components/pages/mypage/TabBoards";

export interface DataProps {
  imgUrl?: string;
  nickname: string;
  email: string;
  introduction?: string;
  stacks?: string[];
  position:
    | "프론트엔드"
    | "백엔드"
    | "디자이너"
    | "데브옵스"
    | "기획자"
    | "마케터";
  career: "0" | "1~3" | "4~6" | "7년 이상";
  githubUrl?: string;
  blogUrl?: string;
  portfolioUrl?: string;
  likeBoards?: BoardCardProps[];
  uploadBoards?: BoardCardProps[];
  applyBoards?: BoardCardProps[];
}

export default function MyPage() {
  const [data, setData] = useState<DataProps | null>(null);
  const [boards, setBoards] = useState<BoardCardProps[] | undefined | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://ec09fe3d-37a5-419e-9077-f537f3591137.mock.pstmn.io/mypage",
        );
        setData(result.data);
      } catch (error) {
        setData(null);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState("profile");

  const onClickTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (activeTab === "likeBoards" && data) {
      setBoards(data.likeBoards);
    } else if (activeTab === "uploadBoards" && data) {
      setBoards(data.uploadBoards);
    } else if (activeTab === "applyBoards" && data) {
      setBoards(data.applyBoards);
    }
  }, [activeTab]);

  return (
    <Container>
      <TapWrapper>
        <TapMenu
          isActive={activeTab === "profile"}
          onClick={() => onClickTab("profile")}
        >
          프로필
        </TapMenu>
        <TapMenu
          isActive={activeTab === "likeBoards"}
          onClick={() => onClickTab("likeBoards")}
        >
          관심 게시물
        </TapMenu>
        <TapMenu
          isActive={activeTab === "uploadBoards"}
          onClick={() => onClickTab("uploadBoards")}
        >
          등록 게시물
        </TapMenu>
        <TapMenu
          isActive={activeTab === "applyBoards"}
          onClick={() => onClickTab("applyBoards")}
        >
          지원목록
        </TapMenu>
      </TapWrapper>
      <ContentsWrapper>
        {activeTab === "profile" && data && <Profile {...data} />}
        {data && boards && <TabBoards boards={boards} title={activeTab} />}
      </ContentsWrapper>
    </Container>
  );
}
