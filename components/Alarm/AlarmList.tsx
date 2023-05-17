import { Dispatch, MouseEvent, SetStateAction, useRef } from "react";
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

export interface AlarmProps {
  lastId: number;
  alarmNum: number;
  alarms: AlarmProps[];
}

export interface AlarmProps {
  id: number;
  type: string;
  watched: boolean;
  title: string;
  createAt: string;
  boardId: string;
  category: string;
  boardTitle: string;
}
interface AlarmListProps {
  alarmList: AlarmProps | null;
  setOpenAlarm: Dispatch<SetStateAction<boolean>>;
}

export default function AlarmList({ alarmList, setOpenAlarm }: AlarmListProps) {
  const router = useRouter();

  const onClickAlarm =
    (category: string, boardId: string) => (e: MouseEvent<HTMLDivElement>) => {
      // 알람 읽음 API 추가
      e.stopPropagation();
      router.push(`/${category}/${boardId}`);
      setOpenAlarm(false);
    };

  const onClickCloseAlarm = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    setOpenAlarm(false);
  };

  const onClickDeleteAlarm = (id: number) => (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    // 알람 삭제 API 추가
    alert(`${id}: 알람삭제`);
    setOpenAlarm(false);
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>알림</HeaderTitle>
        <CloseButton onClick={onClickCloseAlarm} />
      </Header>
      {alarmList ? (
        alarmList.alarms.map((alarm) => (
          <Wrapper
            watched={alarm.watched}
            key={alarm.id}
            onClick={onClickAlarm(alarm.category, alarm.boardId)}
          >
            <RowWrapper>
              <Title>{alarm.title}</Title>
              <DeleteButton onClick={onClickDeleteAlarm(alarm.id)} />
            </RowWrapper>
            <RowWrapper>
              <Contents>{alarm.boardTitle}</Contents>
              <Date>{alarm.createAt}</Date>
            </RowWrapper>
          </Wrapper>
        ))
      ) : (
        <EmptyMessage>알림창이 비어있어요</EmptyMessage>
      )}
    </Container>
  );
}