import { AxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';
import { useUserInfoStore } from '../store/authStore';
import { useMutation } from '@tanstack/react-query';
import {
  LoginForm,
  loginUser,
  signupUser,
  LoginResponse,
  fetchUserInfo,
} from '../api/authApi';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      alert('회원가입이 완료되었습니다.');
      console.log('회원가입 성공:', data);
    },
    onError: (error: AxiosError) => {
      console.error('회원가입에 실패했습니다.', error);
    },
  });
};

export const useLoginMutation = () => {
  const { setUserInfo } = useUserInfoStore();
  const { clearLoginData } = useAuthStore();

  return useMutation<LoginResponse, AxiosError, LoginForm>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      // 토큰을 localStorage에 저장
      localStorage.setItem('token', data.token);

      // 사용자 정보 가져오기
      const response = await fetchUserInfo();
      setUserInfo(response.userInfo);

      alert('login success!');
      clearLoginData();
    },
    onError: (error) => {
      console.error('로그인에 실패했습니다.', error);
    },
  });
};