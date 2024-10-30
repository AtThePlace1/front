'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserLikeList } from '../store/store';

export default function CafeInfo({
  cafe,
  key,
}: {
  cafe: UserLikeList;
  key: number;
}) {
  const router = useRouter();
  console.log(cafe);
  const handleClick = () => {
    router.push(`detail/${cafe.cafe_id}`);
  };

  return (
    <li
      key={key}
      className="mt-3 rounded-xl bg-gray-400/70"
      onClick={handleClick}
    >
      <div className="flexBetween p-2">
        <div className="flex flex-col gap-1 text-sm">
          <h3 className="font-bold">{cafe.cafe_name}</h3>
          <div className="flex gap-[1px] text-[12px]">
            <span>{cafe.opening_hours}</span>
            <span>ㅣ</span>
            <span>{cafe.contact_number}</span>
          </div>
          <div className="text-[12px]">{cafe.location_address}</div>
        </div>
        <div>
          <Image
            src={'/images/blackBg.webp'}
            alt=""
            className="rounded-md"
            width={80}
            height={70}
          />
        </div>
      </div>
    </li>
  );
}
