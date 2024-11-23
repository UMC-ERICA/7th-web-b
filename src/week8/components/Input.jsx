import styled from "styled-components";

const Input = ({ value, onChange, onSubmit, placeholder }) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <InputField
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </StyledForm>
  );
};

export default Input;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  width: 500px;
  height: 50px;
  border-radius: 10px;
`;
