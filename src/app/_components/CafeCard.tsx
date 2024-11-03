import Image from 'next/image';
import Link from 'next/link';
import { Cafe } from '../store/cafeStore';

interface CafeCardProps {
  cafe: Cafe;
}

export default function CafeCard({ cafe }: CafeCardProps) {
  return (
    <li className="min-w-[250px] flex-none rounded-lg bg-white p-4 shadow-lg">
      <Link
        href={`/detail/${cafe.id}`}
        className="flex cursor-pointer flex-row transition-shadow hover:shadow-lg"
      >
        <div className="max-w-40 flex-grow">
          <h3 className="mt-2 text-lg font-bold text-gray-500">
            {cafe.cafe_name}
          </h3>
          <p className="text-sm text-gray-500">{cafe.opening_hours}</p>
          <p className="text-sm text-gray-500">{cafe.contact_number}</p>
          <p className="truncate text-sm text-gray-500">
            서울 마포구 양화로11길 50 해동빌딩 1층~지하1층
          </p>
        </div>
        <Image
          src={'/images/어반플렌트_2.jpeg'}
          alt={`${cafe.cafe_name} 이미지`}
          width={80}
          height={70}
          className="rounded-md object-cover"
        />
      </Link>
    </li>
  );
}
