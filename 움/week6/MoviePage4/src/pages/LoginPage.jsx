import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${props => props.error ? 'red' : '#ccc'};
  border-radius: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

const LoginButton = styled.button`
  width: 300px;
  padding: 10px;
  background-color: ${props => props.disabled ? 'gray' : '#ff007f'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8 || value.length > 16) {
      setPasswordError('비밀번호는 8자 이상 16자 이하여야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const isFormValid = email && password && !emailError && !passwordError;

  const handleLogin = async() => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", {
            email,
            password,
        });

        // 토큰을 로컬스토리지에 저장
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        // 메인 페이지로 이동
        window.location.href = '/home';
    } catch (error) {
        console.error('로그인 실패:', error);
    }
};
  return (
    <LoginContainer>
      <h2>로그인 페이지</h2>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={handleEmailChange}
        onBlur={() => handleBlur('email')}
        error={touched.email && emailError}
      />
      {touched.email && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
        onBlur={() => handleBlur('password')}
        error={touched.password && passwordError}
      />
      {touched.password && passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      <LoginButton disabled={!isFormValid} onClick={handleLogin}>
        로그인
      </LoginButton>
    </LoginContainer>
  );
};

export default LoginPage;