'use client';

import Image from 'next/image';
import CafeInfo from '@/app/_components/CafeInfo';
import { useUserInfoStore } from '../store/authStore';
import { UserLikeList } from '../store/authStore';
export default function Mypage() {
  const { userInfo } = useUserInfoStore();
  console.log(userInfo);

  return (
    <div className="mt-5 flex w-8/12 flex-col">
      {/* 프로필 이미지 및 유저 이름 */}
      <div className="flex flex-col items-center gap-3">
        <Image
          src={userInfo.profile_image}
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
            userInfo?.likeList.map((cafe: UserLikeList, index: number) => (
              <CafeInfo cafe={cafe} key={index} />
            ))
          ) : (
            <p className="mt-3">찜한 카페가 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
