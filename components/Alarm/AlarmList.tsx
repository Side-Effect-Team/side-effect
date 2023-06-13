import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from "react";
import {
  CloseButton,
  Container,
  Contents,
  Date,
  DeleteButton,
  EmptyMessage,
  Header,
  HeaderTitle,
  RowWrapper,
  Title,
  Wrapper,
} from "./styled";
import { useRouter } from "next/router";
import { useReadAlarm } from "hooks/mutations/useReadAlarm";
import { useDeleteAlarm } from "hooks/mutations/useDeleteAlarm";

export interface AlarmProps {
  id: number;
  watched: boolean;
  title: string;
  contents: string;
  createdAt: string;
  link: string;
}
interface ResponseProps {
  lastId: number;
  notificationResponses: AlarmProps[];
}
interface AlarmListProps {
  alarmData: ResponseProps[];
  setOpenAlarm: Dispatch<SetStateAction<boolean>>;
  Observer: () => JSX.Element | undefined;
}

export default function AlarmList({
  alarmData,
  setOpenAlarm,
  Observer,
}: AlarmListProps) {
  const router = useRouter();
  const onClickCloseAlarm = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    setOpenAlarm(false);
  };
  // 알람 읽기
  const readMutate = useReadAlarm();

  const onClickReadAlarm =
    (link: string, id: number) => async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      router.push(`${link}`);
      setOpenAlarm(false);
      readMutate(id);
    };

  // 알람 삭제
  const deleteMutate = useDeleteAlarm();

  const onClickDeleteAlarm =
    (id: number) => async (e: MouseEvent<SVGAElement>) => {
      e.stopPropagation();
      deleteMutate(id);
    };
  console.log(alarmData);

  return (
    <Container>
      <Header>
        <HeaderTitle>알림</HeaderTitle>
        <CloseButton onClick={onClickCloseAlarm} />
      </Header>
      {alarmData && alarmData[0].notificationResponses.length === 0 ? (
        <EmptyMessage>알림창이 비어있어요</EmptyMessage>
      ) : (
        alarmData.map((page: ResponseProps) => {
          return page.notificationResponses.map((alarm) => (
            <Wrapper
              watched={alarm.watched}
              key={alarm.id}
              onClick={onClickReadAlarm(alarm.link, alarm.id)}
            >
              <RowWrapper>
                <Title>{alarm.contents}</Title>
                <DeleteButton onClick={onClickDeleteAlarm(alarm.id)} />
              </RowWrapper>
              <RowWrapper>
                <Contents>{alarm.title}</Contents>
                <Date>{alarm.createdAt}</Date>
              </RowWrapper>
            </Wrapper>
          ));
        })
      )}
      {alarmData[0].notificationResponses.length > 10 && Observer()}
      {/* {Observer()} */}
    </Container>
  );
}
