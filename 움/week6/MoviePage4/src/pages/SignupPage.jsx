import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일 형식이어야 합니다.').required('이메일은 필수 입력 항목입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .required('비밀번호는 필수 입력 항목입니다.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 항목입니다.')
});

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // 회원가입 요청을 보내는 axios POST 요청
      await axios.post("http://localhost:3000/auth/register", {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck
      });
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <Container>
      <h2>회원가입</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register('email')}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register('password')}
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        
        <Input
          type="password"
          placeholder="비밀번호 확인을 입력해주세요"
          {...register('passwordCheck')}
        />
        {errors.passwordCheck && <ErrorText>{errors.passwordCheck.message}</ErrorText>}
        
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 100%;
  background-color: #ff007f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
