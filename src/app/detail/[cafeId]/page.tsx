'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCafeInfoStore } from '@/app/store/store';
import { useCafeDetail } from '@/app/hook/UseCafeDetail';

export default function Detail({ params }: { params: { cafeId: string } }) {
  const router = useRouter();
  const { cafeInfo } = useCafeInfoStore();

  // cafeId를 기반으로 카페 정보를 가져오는 useCafeDetail 호출
  useCafeDetail(Number(params.cafeId));

  return (
    <div className="relative mx-auto mt-5 h-full w-[330px]">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => router.back()}>
          <Image
            src={'/icons/backArrow.svg'}
            width={25}
            height={25}
            alt="뒤로 가기"
          />
        </button>
        <h1 className="text-lg font-bold">
          {cafeInfo?.cafeName || '카페 이름'}
        </h1>
        <button type="button">
          <Image
            src={'/icons/heartIcon.svg'}
            width={25}
            height={25}
            alt="좋아요"
          />
        </button>
      </div>
      {/* 카페 이미지 및 정보 표시 */}
      <picture className="mt-8 flex justify-center">
        <Image
          src={'/images/어반플렌트_2.jpeg'}
          width={270}
          height={200}
          className="rounded-lg"
          alt="카페 대표사진"
        />
      </picture>
      <section className="mt-10 rounded-lg p-4">
        <h2 className="text-lg">카페 정보</h2>
        <div className="h-[1px] w-full bg-white" />
        <ul className="mt-2 flex flex-col gap-1">
          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">영업 시간</h3>
            <p>{cafeInfo?.openingHours || '11:00-19:30'}</p>
          </li>
          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">카페 위치</h3>
            <p>{cafeInfo?.location || '서울 마포구 동교로 139 1층'}</p>
          </li>
          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">연락처</h3>
            <p>{cafeInfo?.contactNumber || '02-3225-1984'}</p>
          </li>
          <li className="flexBetween" role="contentInfo">
            <h3>
              <Image
                src={'/icons/instagramSimple.svg'}
                width={30}
                height={30}
                alt="인스타그램 주소"
              />
            </h3>
            <Link
              href={cafeInfo?.sns || '#'}
              className="underline underline-offset-[6px]"
              target="_blank"
            >
              인스타그램
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
