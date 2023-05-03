import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { breakPoints } from "../../styles/Media";
import Banner from "../../components/Banner";
import BoardCard from "../../components/BoardCard";
import { BASE_URL, BANNER_CONTENTS } from "../../enum";

interface RecruitType {
  id: number;
  headerTitle: string;
  tag: string[];
  title: string;
  content: string;
  createdAt: string;
  like: boolean;
}

export default function RecruitsPage() {
  const router = useRouter();
  const [recruitsData, setRecruitsData] = useState([]);

  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["recruits"],
  //   queryFn: async () => {
  //     const res = await fetch(BASE_URL + "/api" + router.pathname);
  //     return await res.json();
  //   },
  // });
  //
  // if (isError) {
  //   return <h2>일시적으로 페이지를 로드할 수 없습니다</h2>;
  // }
  //
  // if (isLoading) {
  //   return <h2>Loading...</h2>;
  // }

  useEffect(() => {
    const data = localStorage.getItem("recruits");
    if (data) setRecruitsData(JSON.parse(data));
  }, []);

  return (
    <Wrapper>
      <Banner
        title={BANNER_CONTENTS.TITLE}
        subTitle={BANNER_CONTENTS.SUB_TITLE}
        btnLink="/post/recruit"
      />
      <Contents>
        <ContentsHeader>
          <div>
            <h2>팀원 모집 게시판</h2>
          </div>
          <FilterBox>
            <select>
              <option value="">선택하세요</option>
              <option value="nodejs">Nodejs</option>
              <option value="java">Java</option>
              <option value="spring">Spring</option>
              <option value="python">Python</option>
              <option value="django">Django</option>
              <option value="swift">Swift</option>
              <option value="kotlin">Kotlin</option>
            </select>
            <select>
              <option value="">선택하세요</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="react">React</option>
            </select>
            <input type="search" placeholder="검색할 내용을 입력하세요" />
          </FilterBox>
        </ContentsHeader>
        <ContentsMain>
          {recruitsData &&
            recruitsData.map((item: RecruitType) => (
              <BoardCard key={item.id} data={item} />
            ))}
        </ContentsMain>
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.background};
`;

const Contents = styled.div`
  margin: 0 auto;
  padding: 1.5rem 1rem;
  max-width: ${breakPoints.desktop}px;
`;

const ContentsHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  select {
    margin-right: 1rem;
  }
  input {
    width: 250px;
  }
`;

const ContentsMain = styled.main`
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
`;
