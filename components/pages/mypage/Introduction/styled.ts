import styled from "styled-components";

export const ProfileWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
`;
export const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
`;

export const NickName = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
`;
export const Text = styled.p`
  color: #667085;
  margin: 0;
  margin-bottom: 15px;
`;
export const ContentsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;
export const ContentLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 15px;
`;
export const ContentNum = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 10px;
  color: #667085;
`;
export const ContentTitle = styled.p`
  font-weight: 600;
  margin: 0;
  color: #667085;
`;
