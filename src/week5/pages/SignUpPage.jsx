import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

const SignUpPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required(),
    passwordCheck: yup
      .string()
      .required("비밀번호 검증은 필수 입력입니다.")
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
    // 비밀번호를 체크할 때
    birth: yup.date().required("생년월일을 반드시 입력해주세요."),
    gender: yup.string().required("성별을 반드시 입력해주세요."),
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
  const passwordCheck = watch("passwordCheck");
  const birth = watch("birth");
  const gender = watch("gender");
  const isEmptyFields =
    !email || !password || !passwordCheck || !birth || !gender;

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };
  // data는 유효성 검사 통과시 입력한 데이터를 담은 객체
  // data란 이름의 객체로 email, password 키를 가짐
  console.log("asd", errors.password);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>회원가입</h1>
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
      <Input
        type={"password"}
        placeholder="비밀번호를 다시 입력해주세요!"
        {...register("passwordCheck")}
      />
      <p style={{ color: "red" }}>{errors.passwordCheck?.message}</p>
      <Input type={"date"} {...register("birth")} />
      <p style={{ color: "red" }}>{errors.birth?.message}</p>
      <Input type={"text"} {...register("gender")} />
      <p style={{ color: "red" }}>{errors.gender?.message}</p>
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
        회원가입
      </Button>
    </Form>
  );
};

export default SignUpPage;

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
  border: 5px solid rgb(247, 17, 97, 0.7);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
  width: 300px;
  background-color: rgb(247, 17, 97);
  font-weight: bold;
`;
