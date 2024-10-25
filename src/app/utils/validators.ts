// 이메일 정규식 체크
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmailForm = (email: string, setErrors: any) => {
  if (!validateEmail(email)) {
    setErrors((prev: any) => ({
      ...prev,
      email: '유효하지 않은 이메일 형식입니다.',
    }));
    return false;
  }
  return true;
};

// 비밀번호 정규식 체크
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};

export const validatePasswordForm = (password: string, setErrors: any) => {
  if (!validatePassword(password)) {
    setErrors((prev: any) => ({
      ...prev,
      password: '비밀번호는 최소 8자, 숫자 및 특수 문자를 포함해야 합니다.',
    }));
    return false;
  }
  return true;
};

// 비밀번호 확인
export const checkConfirmPassword = (
  password: string,
  confirmPassword: string,
  setErrors: any
) => {
  if (password !== confirmPassword) {
    setErrors((prev: any) => ({
      ...prev,
      confirmPassword: '비밀번호가 일치하지 않습니다.',
    }));
    return false;
  }
  return true;
};