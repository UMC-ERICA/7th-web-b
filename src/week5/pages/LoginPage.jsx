import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

const LoginPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  // register는 유효성 검사를 위해 입력 값을 React Hook Form에 등록하는 함수
  // handleSubmit이 schema를 기반으로 유효성 검사
  // 유효성 검사 통과시 → form데이터를 하나의 객체로 만들어서(중요!!)
  // onSubmit 함수의 매개변수로 넘겨줌. → 그 후 onSubmit 함수 실행

  const email = watch("email");
  const password = watch("password");
  // 필드가 비어있는지 체크
  // 비어있으면 true, 아니면 false
  const isEmptyFields = !email || !password;

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };
  // data는 유효성 검사 통과시 입력한 데이터를 담은 객체
  // data란 이름의 객체로 email, password 키를 가짐

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>로그인</h1>
      <br />
      <Input
        type={"email"}
        placeholder="이메일을 입력해주세요!"
        {...register("email")}
      />
      <p style={{ color: "red" }}>{errors.email?.message}</p>
      <Input
        type={"password"}
        placeholder="비밀번호를 입력해주세요!"
        {...register("password")}
      />
      <p style={{ color: "red" }}>{errors.password?.message}</p>
      <Button
        style={{
          backgroundColor:
            isEmptyFields || Object.keys(errors).length > 0
              ? "gray"
              : "#f71161",
          border:
            isEmptyFields || Object.keys(errors).length > 0
              ? "5px solid gray"
              : "5px solid #f71161",
        }}
        type={"submit"}
        disabled={isEmptyFields || Object.keys(errors).length > 0}
      >
        로그인
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Input = styled.input`
  border: 5px solid rgb(200, 200, 200, 0.7);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
  width: 300px;
`;

const Button = styled.button`
  border: 5px solid rgb(128, 128, 128, 0.7);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
  width: 300px;
  background-color: #f71161;
  color: white;
  font-weight: bold;
`;

export default LoginPage;
