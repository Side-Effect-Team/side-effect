import { Dispatch, SetStateAction } from "react";
import SelectBox from "@/components/SelectBox";
import { Input } from "./styled";
import { UseFormRegister } from "react-hook-form";
import { InfoTitle, InfoWrapper } from "../../mypage/Info/styled";
import { FormData } from "@/pages/mypage/edit";

interface InfoEditProps {
  career: string | number;
  setCareer: Dispatch<SetStateAction<string | number>>;
  position: string | number;
  setPosition: Dispatch<SetStateAction<string | number>>;
  infoRegister: UseFormRegister<
    Pick<FormData, "github" | "blog" | "portfolio">
  >;
  github: string | undefined;
  blog: string | undefined;
  portfolio: string | undefined;
}
const SELECT_CAREER = ["0", "1~3", "4~6", "7년 이상 "];
const SELECT_POSITIONS = [
  "프론트엔드",
  "백엔드",
  "디자이너",
  "데브옵스",
  "기획자",
  "마케터",
];
export default function InfoEdit({
  career,
  setCareer,
  position,
  setPosition,
  infoRegister,
  github,
  blog,
  portfolio,
}: InfoEditProps) {
  return (
    <>
      <InfoWrapper>
        <InfoTitle>*포지션</InfoTitle>
        <SelectBox
          options={SELECT_POSITIONS}
          setValue={setPosition}
          value={position}
          title="포지션"
        />
      </InfoWrapper>
      <InfoWrapper>
        <InfoTitle>*경력</InfoTitle>
        <SelectBox
          options={SELECT_CAREER}
          setValue={setCareer}
          value={career}
          title="경력"
        />
      </InfoWrapper>
      <InfoWrapper>
        <InfoTitle>깃허브</InfoTitle>
        <Input
          defaultValue={github || ""}
          placeholder="정보를 등록해주세요"
          {...infoRegister("github")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </InfoWrapper>
      <InfoWrapper>
        <InfoTitle>블로그</InfoTitle>
        <Input
          defaultValue={blog || ""}
          placeholder="정보를 등록해주세요"
          {...infoRegister("blog")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </InfoWrapper>
      <InfoWrapper>
        <InfoTitle>포트폴리오</InfoTitle>
        <Input
          defaultValue={portfolio || ""}
          placeholder="정보를 등록해주세요"
          {...infoRegister("portfolio")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </InfoWrapper>
    </>
  );
}
