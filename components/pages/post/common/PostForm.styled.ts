import styled from "styled-components";

export const InputBox = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LabelForm = styled.label`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const InputForm = styled.input`
  border: none;
  padding: 0.25rem;
`;

export const TextareaForm = styled.textarea`
  padding: 0.25rem;
  height: 10rem;
  border: none;
  resize: none;
`;

export const SubmitBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ErrorMsg = styled.span`
  margin-top: 5px;
  font-size: 0.85rem;
  color: ${(p) => p.theme.colors.danger};
`;
