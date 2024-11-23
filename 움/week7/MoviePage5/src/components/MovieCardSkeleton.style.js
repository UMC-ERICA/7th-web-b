import styled, { keyframes } from "styled-components";

const skeleton = keyframes`
    0% {
        opacity: 1;
    }
    30% {
        opacity: 0.6;
    }
    50% {
        opacity: 0.2;
    }
    80% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CardMain = styled.div`
  width: 168px;
  height: 240px;
  background: rgb(230, 230, 230);
  border-radius: 8px;
  overflow: hidden;
  animation: ${skeleton} 3s 1s infinte linear alternate;
`;

const TextWrapper = styled.div`
  width: 168px;
  height: 45px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 5px;
`;
const TitleBox = styled.div`
  width: 168px;
  height: 24px;
  background: rgb(230, 230, 230);
  border-radius: 8px;
  animation: ${skeleton} 3s 1s infinte linear alternate;
`;
const DescriptionBox = styled.div`
  width: 168px;
  height: 20px;
  background: rgb(230, 230, 230);
  border-radius: 8px;
  animation: ${skeleton} 3s 1s infinte linear alternate;
`;

export { Container, CardMain, TextWrapper, TitleBox, DescriptionBox };
