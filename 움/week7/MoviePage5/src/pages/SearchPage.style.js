import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;

  input {
    flex: 1;
    padding: 15px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
  }

  button {
    width: 80px;
    background-color: #ff007f;
    color: white;
    cursor: pointer;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const MovieGridContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 20px;
  padding: 1rem;
  width: 100%; // MovieGrid가 부모 요소 너비를 꽉 채우도록 설정
  box-sizing: border-box;
`;
export { SearchContainer, MovieGridContainer };
