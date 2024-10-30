'use client';

import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { fetchUserInfo, loginUser } from '../api/apiRequests';
import { useMutation } from '@tanstack/react-query';
import { LoginForm } from '../api/apiRequests';
import { AxiosError } from 'axios';
import { useUserInfoStore } from '../store/store';

export default function Login() {
  const { loginData, setLoginData, clearLoginData } = useAuthStore();
  const [errors, setErrors] = useState<string>('');
  const { setUserInfo } = useUserInfoStore();

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      // 토큰을 localStorage에 저장
      localStorage.setItem('token', data.token.token);

      const response = await fetchUserInfo();
      console.log(response.userInfo);
      setUserInfo(response.userInfo);

      alert('login success!');
      // window.location.href = '/';

      return () => {
        clearLoginData();
      };
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          setErrors('아이디 또는 비밀번호가 잘못되었습니다.');
          return;
        }
      }
      setErrors('로그인에 실패했습니다.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'email' || id === 'password') {
      setLoginData(id as keyof LoginForm, value);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  return (
    <div className="flexCenter mt-10 w-[300px] flex-col rounded-xl bg-[#353434]/75 p-10">
      <div className="mb-8 text-center">
        <h2 className="text-lg font-semibold text-white">로그인</h2>
      </div>

      <form className="w-full bg-transparent" onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm text-white">
            아이디
          </label>
          <input
            type="email"
            id="email"
            value={loginData.email}
            onChange={handleChange}
            className="inputCommon w-full"
            placeholder="이메일 아이디"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-1 block text-sm text-white">
            비밀번호 입력
          </label>
          <input
            type="password"
            id="password"
            value={loginData.password}
            onChange={handleChange}
            className="inputCommon w-full"
            placeholder="비밀번호 입력"
            required
          />
        </div>

        {/* 에러 메시지 출력 */}
        {errors && <p className="mb-4 text-red-500">{errors}</p>}

        <div className="mb-4 mt-6">
          <button
            type="submit"
            className="w-full rounded-sm bg-[#FF6347] py-3 font-semibold text-white"
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
        </div>

        <div className="text-center">
          <a
            href="/signup"
            className="text-sm text-gray-200 underline underline-offset-2"
          >
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}
