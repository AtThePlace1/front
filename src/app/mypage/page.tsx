'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CafeInfo from '@/app/_components/CafeInfo';
import { useUserInfoStore } from '../store/store';
import { UserLikeList } from '../store/store';

export default function Mypage() {
  const { userInfo } = useUserInfoStore();
  const router = useRouter();

  // useEffect(() => {
  //   // userInfo가 없으면 로그인 페이지로 리다이렉트
  //   if (userInfo === null) {
  //     router.push('/login');
  //   }
  // }, []);

  return (
    <div className="mt-5 flex w-8/12 flex-col">
      {/* 프로필 이미지 및 유저 이름 */}
      <div className="flex flex-col items-center gap-3">
        <Image
          src={userInfo?.profileImage || '/images/coffee-bean.png'} // profile_image가 없을 경우 기본 이미지 사용
          alt="프로필 이미지"
          width={100}
          height={100}
          className="rounded-full"
        />
        <strong>{userInfo?.nickname || '유저 이름'}</strong> {/* 유저 닉네임 */}
      </div>

      {/* 찜 목록 */}
      <div className="mt-10">
        <div className="flexBetween">
          <div className="mb-1">찜 목록</div>
          <button type="button" className="text-sm">
            편집
          </button>
        </div>
        <div className="w-full border" />

        <ul>
          {userInfo?.likeList && userInfo?.likeList.length > 0 ? (
            userInfo?.likeList.map((cafe: UserLikeList) => (
              <CafeInfo cafe={cafe} key={cafe.id} />
            ))
          ) : (
            <p className="mt-3">찜한 카페가 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
