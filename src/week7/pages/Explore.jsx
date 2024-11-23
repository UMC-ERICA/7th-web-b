import styled from "styled-components";
import disney from "../assets/disney.jpg";
import netflix from "../assets/netflix.jpg"
import tving from "../assets/tving.jpg";
import watcha from "../assets/watcha.jpg";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  return (
    <Lists>
      <CategoryList>
        <Link to="/movies/now-playing">
          <CategoryImage src={disney} />
          <Categorytext>현재 상영 중인</Categorytext>
        </Link>
      </CategoryList>
      <CategoryList>
        <Link to="/movies/popular">
          <CategoryImage src={netflix} />
          <Categorytext>인기 있는</Categorytext>
        </Link>
      </CategoryList>
      <CategoryList>
        <Link to="/movies/top-rated">
          <CategoryImage src={tving} />
          <Categorytext>높은 평가를 받은</Categorytext>
        </Link>
      </CategoryList>
      <CategoryList>
        <Link to="/movies/up-coming">
          <CategoryImage src={watcha} />
          <Categorytext>개봉 예정 중인</Categorytext>
        </Link>
      </CategoryList>
    </Lists>
  );
};

export default ExplorePage;

const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 20px;
  justify-content: space-around;
`;
const CategoryList = styled.div`
  display: flex;
  position: relative;
  margin: 10px;
`;

const CategoryImage = styled.img`
  border-radius: 10px;
  width: 300px;
  height: 150px;
`;

const Categorytext = styled.h1`
  position: absolute;
  bottom: 10%; // 여백을 준 것
  left: 5%;
  font-size: 24px;
  color: white;
  background-color: #303134;
  border-radius: 10px;
  padding: 5px;
  opacity: 0.8;
`;
