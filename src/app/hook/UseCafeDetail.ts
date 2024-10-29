'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { useCafeInfoStore, CafeInfoType } from '../store/store';


export const useCafeDetail = (cafeId: number) => {
  const { setCafeInfo } = useCafeInfoStore();

  const { data, error, isLoading } = useQuery<CafeInfoType>({
    queryKey: ['cafeDetail', cafeId],
    queryFn: async () => {
      const response = await api.get(`cafe/detail/${cafeId}`);

      return response.data;
    }
  }

    async () => {
      const response = await api.get(`/cafe/detail/${cafeId}`);
      // 응답 데이터에서 첫 번째 카페 객체를 반환합니다.
      return {
        id: response.data.cafe[0].id,
        cafeName: response.data.cafe[0].cafe_name,
        openingHours: response.data.cafe[0].opening_hours,
        location: response.data.cafe[0].location_address,
        latitude: response.data.cafe[0].latitude,
        longitude: response.data.cafe[0].longitude,
        contactNumber: response.data.cafe[0].contact_number,
        sns: response.data.cafe[0].sns_account,
      };
    },
    {
      // 로딩 시 로직 추가
      enabled: !!cafeId, // cafeId가 있을 때만 쿼리를 실행합니다.
    }
  );

  // 데이터가 성공적으로 로드된 경우 상태에 저장
  if (data) {
    setCafeInfo(data);
  }

  // 오류가 발생한 경우 콘솔에 오류 메시지를 출력
  if (error) {
    console.error('카페 정보를 가져오는 데 실패했습니다:', error);
  }

  // 로딩 상태와 오류 상태를 반환
  return { data, error, isLoading };
};
