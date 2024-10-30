'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // useParams 추가
import { fetchCafeDetail } from '@/app/utils/apiRequests';
import { useCafeInfoStore } from '@/app/store/store';
import Image from 'next/image';
import Link from 'next/link';

export default function Detail() {
  const router = useRouter();
  const params = useParams(); // useParams를 사용하여 URL 파라미터를 가져옴
  const { cafeInfo, setCafeInfo, clearCafeInfo } = useCafeInfoStore();

  useEffect(() => {
    const loadCafeDetail = async () => {
      const cafeId = Number(params.cafeId); // useParams로 가져온 cafeId 사용
      if (cafeId) {
        try {
          const cafeData = await fetchCafeDetail(cafeId);
          setCafeInfo(cafeData);
        } catch (error) {
          console.error('카페 정보를 가져오는 데 실패했습니다.', error);
        }
      }
    };

    loadCafeDetail();

    // 컴포넌트 언마운트 시 상태 초기화
    return () => {
      clearCafeInfo();
    };
  }, [params.cafeId, setCafeInfo, clearCafeInfo]);

  if (!cafeInfo) {
    return <div>Loading...</div>;
  }

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

        <h1 className="text-lg font-bold">{cafeInfo.cafeName}</h1>

        <button type="button">
          <Image
            src={'/icons/heartIcon.svg'}
            width={25}
            height={25}
            alt="좋아요"
          />
        </button>
      </div>

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
            <h3 className="font-bold">영업 시간 </h3>
            <p>{cafeInfo.openingHours}</p>
          </li>

          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">카페 위치 </h3>
            <p>{cafeInfo.location}</p>
          </li>

          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">연락처 </h3>
            <p>{cafeInfo.contactNumber}</p>
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
              href={cafeInfo.sns}
              className="underline underline-offset-[6px]"
              target="_blank"
            >
              인스타그램
            </Link>
          </li>

          <li className="mt-10">
            <Image
              src={'/images/어반_멘.jpeg'}
              alt="메뉴판"
              width={140}
              height={200}
              className="h-[200px]"
            />
          </li>
        </ul>
      </section>
    </div>
  );
}
