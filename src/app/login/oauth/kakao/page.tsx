'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { kakaoLogin } from '@/app/api/auth/kakao/kakaoLoginApi';

export default function KaKaoRedirect() {
  const router = useRouter();

  useEffect(() => {
    const handleKakaoAuth = async () => {
      const code = new URL(window.location.href).searchParams.get('code'); // URL에서 인가 코드 추출
      console.log('인가 코드: ', code);
      if (!code) {
        console.error('카카오 인증 실패: 인가 코드가 없습니다.');
        return;
      }

      try {
        const data = await kakaoLogin(code); // 카카오 로그인 API 호출
        console.log(data);
        if (data) {
          localStorage.setItem('token', data.token); // 토큰 저장
          router.push('/'); // 홈 페이지로 이동
        }
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
      }
    };

    handleKakaoAuth();
  }, []);

  return <div>카카오 인증 중...</div>;
}
