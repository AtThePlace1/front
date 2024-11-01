import useAuthStore from '../store/authStore';
import { useUserInfoStore } from '../store/store';
import { useMutation } from '@tanstack/react-query';
import {
  loginUser,
  fetchUserInfo,
  LoginResponse,
  LoginForm,
} from '../api/authApi';
import { AxiosError } from 'axios';

export const useLoginMutation = () => {
  const { setUserInfo } = useUserInfoStore();
  const { clearLoginData } = useAuthStore();

  return useMutation<LoginResponse, AxiosError, LoginForm>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      // 토큰을 localStorage에 저장
      localStorage.setItem('token', data.token.token);

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
