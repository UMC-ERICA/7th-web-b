import styled from "styled-components";

const CustomButton = () => {
    return (
        <>
            <FirstStyledSweetPotato color={'purple'}>
                <StyledHoverButton>
                    고구마
                </StyledHoverButton>
            </FirstStyledSweetPotato>
            <FirstStyledSweetPotato color={'orange'}>
                <StyledHoverButton>
                    고구마
                </StyledHoverButton>
            </FirstStyledSweetPotato>
        </>
    );
};

export default CustomButton;

const FirstStyledSweetPotato = styled.button`
    background-color: ${props => props.color || 'purple'};
    border: none;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    color: white;
`
const StyledHoverButton = styled.button`
	&:hover {
		// 밑줄을 부여한다.
		text-decoration: underline;
	}
`

