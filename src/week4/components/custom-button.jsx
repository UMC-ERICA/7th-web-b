import styled from "styled-components";
const CustomButton = () => {
  return (
    <>
      <FirstStyledSweetPotato color={"purple"}>
        커스텀 버튼
      </FirstStyledSweetPotato>
      <FirstStyledSweetPotato >
        커스텀 버튼
      </FirstStyledSweetPotato>
    </>
  );
};

export default CustomButton;

const FirstStyledSweetPotato = styled.button`
  background-color: ${(props) => props.color || "purple"};
  border: none;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  color: white;
`;
