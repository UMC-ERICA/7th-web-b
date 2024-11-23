import styled from "styled-components";

const SkeletonCardContainer = styled.div`
  width: 92px; /* Card와 동일한 너비 */
  margin: 10px;
  background-color: rgba(224, 224, 224, 0.8); /* 스켈레톤 색상 */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s infinite;

  img {
    width: 100%; /* 이미지 너비를 카드와 동일하게 설정 */
    height: 138px; /* 적절한 높이 설정 (예: 200px에서 비율 조정) */
    border-radius: 8px;
    background-color: rgba(200, 200, 200, 0.5); /* 스켈레톤 이미지 색상 */
  }

  h5 {
    margin: 0;
    width: 92px;
    height: 16px; /* 스켈레톤 텍스트 높이 */
    background-color: rgba(200, 200, 200, 0.5); /* 스켈레톤 텍스트 색상 */
  }

  h6 {
    margin: 0;
    width: 70px; /* 스켈레톤 텍스트 너비 */
    height: 14px; /* 스켈레톤 텍스트 높이 */
    background-color: rgba(200, 200, 200, 0.5); /* 스켈레톤 텍스트 색상 */
  }

`;
const SkeletonCard = () => {
  return (
    <SkeletonCardContainer>
      <div style={{ width: '100%', height: '138px', backgroundColor: 'rgba(200, 200, 200, 0.5)', borderRadius: '8px' }} />
      <h5 />
      <h6 />
    </SkeletonCardContainer>
  );
};

export default SkeletonCard;