import axios from "axios";
import { GetStaticPropsContext } from "next";
import { Wrapper, Contents } from "@/postComps/common/PageLayout.styled";
import PositionDetail from "@/detailComps/PositionDetail";
import ContentDetail from "@/detailComps/ContentDetail";
import CommentBox from "@/detailComps/CommentBox";
import PostData from "@/detailComps/PostData";

interface RecruitDetailPageProps {
  recruit: RecruitType;
}

export default function RecruitDetailPage({ recruit }: RecruitDetailPageProps) {
  console.log(recruit);
  const { id, title, projectName, positions, createdAt, views, tags, content } =
    recruit;

  return (
    <Wrapper>
      <Contents>
        <PostData id={id} title={title} createdAt={createdAt} views={views} />
        <PositionDetail positions={positions} />
        <ContentDetail
          projectName={projectName}
          tags={tags}
          content={content}
        />
        <CommentBox />
      </Contents>
    </Wrapper>
  );
}

export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/recruit-board/all`;

  try {
    const res = await axios.get(url);
    const recruits = res.data.recruitBoards;

    const paths = await recruits.map((recruit: RecruitType) => ({
      params: { recruitId: recruit.id + "" },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.log(err);

    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const recruitId = ctx.params?.recruitId;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/recruit-board/${recruitId}`;

  try {
    const res = await axios.get(url);
    const recruit = await res.data;

    return {
      props: {
        recruit,
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log(err);
    // 404 page로 연결
    return { notFound: true };
  }
}
