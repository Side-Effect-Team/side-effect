import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Wrapper, Contents } from "@/postComps/common/PageLayout.styled";
import { PostTitleStyled } from "@/postComps/common/Title.styled";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Button from "@/components/Button";
import TitleBox from "@/postComps/TitleBox";

export default function PostRecruitPage() {
  const router = useRouter();
  const pageCategory = router.pathname.split("/")[2];
  const [postForm, setPostForm] = useState({
    category: pageCategory,
    projectName: "",
    postTitle: "",
    recruitPositions: [],
    tags: [],
    image: "",
    description: "",
  });
  const { getter, setter } = useLocalStorage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const recruits = getter(pageCategory + "s");
    setter(pageCategory + "s", [...recruits, postForm]);
    window.alert("등록이 완료되었습니다");
    router.push("/" + pageCategory + "s");
  };

  const handleCancel = () => {
    if (window.confirm("작성중인 내용이 사라집니다. 계속 진행하시겠습니까?"))
      router.push("/" + pageCategory + "s");
  };

  useEffect(() => {
    const recruits = getter(pageCategory + "s");
    if (!recruits) setter(pageCategory + "s", []);
  }, [getter, setter]);

  // test
  useEffect(() => {
    console.log(postForm);
  });

  return (
    <Wrapper>
      <Contents>
        <PostTitleStyled>
          {pageCategory === "recruit" ? "팀원 모집하기" : "프로젝트 자랑하기"}
        </PostTitleStyled>
        <TitleBox
          label="프로젝트명"
          inputId="projectName"
          placeholder="3~20자의 프로젝트명을 입력해주세요"
          handleChange={handleChange}
        />
        <Button onClick={handleSubmit}>등록</Button>
        <Button onClick={handleCancel}>취소</Button>
      </Contents>
    </Wrapper>
  );
}
