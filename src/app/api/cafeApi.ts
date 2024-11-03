import api from './api';
import { Cafe } from '../store/cafeStore';

// 카페 정보 요청
export const fetchCafeDetail = async (cafeId: number): Promise<Cafe> => {
  try {
    const response = await api.get(`/cafe/detail/${cafeId}`);
    const cafeData = response.data.cafe[0];

    return {
      id: cafeData.id,
      cafeName: cafeData.cafe_name,
      image_main: cafeData.image_main,
      image_menu: cafeData.image_menu,
      openingHours: cafeData.opening_hours,
      location: cafeData.location_address,
      latitude: cafeData.latitude,
      longitude: cafeData.longitude,
      contactNumber: cafeData.contact_number,
      sns: cafeData.sns_account,
    };
  } catch (error) {
    console.error('카페 정보 불러오기 실패:', error);
    throw error;
  }
};

// 카페 필터링
export const fetchFilteringCafeData = async (queryParams: string) => {
  const response = await api.get(`/cafe/filter?${queryParams}`);
  return response.data;
};
