// 좀 더 봐야할 듯
import useForm from "../hooks/use-form";
import { validateLogin } from "../utils/validate";

const LoginPageRefator = () => {
  const login = useForm({
    initialValues: { email: "", password: "" },
    validate: validateLogin,
  });

  return (
    <div>
      <input
        type="email"
        placeholder="이메일을 입력해주세요!"
        {...login.getTextInputProps("email")}
      />
      {login.touched.email && login.errors.email && <p>{login.errors.email}</p>}
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        {...login.getTextInputProps("password")}
      />
      {login.touched.password && login.errors.password && <p>{login.errors.password}</p>}
    </div>
  );
};

export default LoginPageRefator;