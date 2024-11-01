const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

export const validateUser = (value) => {
  const errors = {};
  
  if (!value) return errors;  // Add null check
  
  if (!value.length) {
    errors.message = "This field is required";
  }

  if (emailPattern.test(value) === false) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }

  if (value.length < 8 || value.length > 16) {
    errors.password = "비밀번호는 8자 이상 16자 이하로 입력해주세요.";
  }

  return errors;
};

export const validateLogin = (values) => {
  const errors = {};
  
  if (!values) return errors;  // Add null check
  
  if (values.email) {
    Object.assign(errors, validateUser(values.email));
  }
  
  if (values.password) {
    Object.assign(errors, validateUser(values.password));
  }
  
  return errors;
};
