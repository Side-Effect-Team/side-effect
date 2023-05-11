import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageTransition from "@/components/pages/userInfoPage/PageTransition";
import SelectBox from "../../components/SelectBox";
import {
  SelectSection,
  ButtonWrapper,
  InputSection,
  Input,
  Label,
  Form,
} from "@/components/pages/userInfoPage/styled";
import Button from "../../components/Button";

const SELECT_POSITIONS = [
  { name: "프론트엔드", value: "frontend" },
  { name: "백엔드", value: "backend" },
  { name: "디자이너", value: "designer" },
  { name: "데브옵스", value: "devops" },
  { name: "기획자", value: "marketer" },
  { name: "마케터", value: "pm" },
];
const SELECT_CAREER = [
  { name: "취업준비생", value: "empty" },
  { name: "신입(0년차)", value: "new" },
  { name: "주니어(1~3년차)", value: "junior" },
  { name: "미들(4~6년차)", value: "middle" },
  { name: "시니어(7년이상)", value: "sinior" },
];
interface FormData {
  github: string;
  blog: string;
}
export default function Position() {
  const [position, setPosition] = useState<string | number>("");
  const [career, setCareer] = useState<string | number>("");
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (!career || !position) {
      alert("포지션과 경력은 필수입력 사항입니다.");
    } else {
      const nickname = localStorage.getItem("nickname");
      // api요청 작성
      router.push("/userinfo/success");
      console.log({ nickname, position, career, ...data });
    }
  };
  return (
    <PageTransition>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>포지션,경력을 선택해주세요.</h1>
        <SelectSection>
          <SelectBox
            options={SELECT_POSITIONS}
            setValue={setPosition}
            title="포지션"
          />
          <SelectBox
            options={SELECT_CAREER}
            setValue={setCareer}
            title="경력"
          />
        </SelectSection>
        <InputSection>
          <h4>
            깃허브와 블로그 주소는 선택사항입니다.
            <br /> <br />
            깃허브나 블로그 주소를 등록하면 팀에 합류할 확률이 더 높아집니다!
          </h4>
          <Label htmlFor="Github">Github</Label>
          <Input id="Github" {...register("github")} />
          <Label htmlFor="Blog">Blog</Label>
          <Input id="Blog" {...register("blog")} />
        </InputSection>
        <ButtonWrapper>
          <Button type="submit" size="large">
            가입완료
          </Button>
          <Button type="button" size="large" onClick={() => router.back()}>
            Back
          </Button>
        </ButtonWrapper>
      </Form>
    </PageTransition>
  );
}
