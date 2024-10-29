'use client';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import arrow from '/public/icons/menuArrow.svg';
import { useQuery } from '@tanstack/react-query';
import { useUserInfoStore } from '../store/store';
import { fetchUserInfo } from '../utils/apiRequests';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo, setUserInfo, clearUserInfo } = useUserInfoStore();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const tokenData = JSON.parse(token);
        const userData = await fetchUserInfo(tokenData.token);
        setUserInfo(userData);
        return userData;
      } catch (error) {
        console.error('토큰 파싱 오류: ', error);
        throw error;
      }
    },
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
    retry: false,
  });

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUserInfo();
    toggleMenu();
    window.location.href = '/';
  };

  // 메뉴가 열리고 닫히는 설정
  const menuClasses = classNames(
    "fixed top-0 right-0 w-10/12 h-full z-40 transform transition-transform duration-300 bg-[url('/images/blackBg.webp')] bg-cover bg-center",
    {
      'translate-x-0': isMenuOpen,
      'translate-x-full': !isMenuOpen,
    }
  );

  return (
    <>
      <button onClick={toggleMenu} className="absolute right-5 cursor-pointer">
        <Image src="/icons/menuIcon.svg" alt="메뉴" width={25} height={25} />
      </button>

      {/* 네비게이션 메뉴 */}
      <nav className={menuClasses}>
        <button className="absolute right-6 top-6" onClick={toggleMenu}>
          X
        </button>
        <ul className="mt-14 flex flex-col gap-7 p-6">
          {/* 마이페이지 / 로그인 */}
          <li className="py-1" style={{ display: data ? 'block' : 'none' }}>
            <Link href={'/mypage'} className="flexBetween" onClick={toggleMenu}>
              <div>마이페이지</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>
          <li className="py-1" style={{ display: userInfo ? 'none' : 'block' }}>
            <Link href="/login" onClick={toggleMenu} className="flexBetween">
              <div>로그인</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>

          {/* 로그아웃 / 회원가입 */}
          <li className="py-1" style={{ display: data ? 'block' : 'none' }}>
            <button
              type="button"
              onClick={handleLogout}
              className="flexBetween"
            >
              <div>로그아웃</div>
              <Image src={arrow} alt="" aria-hidden />
            </button>
          </li>
          <li className="py-1" style={{ display: userInfo ? 'none' : 'block' }}>
            <Link href="/signup" onClick={toggleMenu} className="flexBetween">
              <div>회원가입</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>

          <li className="py-1">
            <Link
              href="/findingCafe"
              onClick={toggleMenu}
              className="flexBetween"
            >
              <div>Test</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>
          <li className="py-1">
            <Link href="/map" onClick={toggleMenu} className="flexBetween">
              <div>Map</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
