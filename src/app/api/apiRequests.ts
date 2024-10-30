import api from './api';
import { CafeInfoType } from '../store/store';

export interface SignupForm {
  email: string;
  password: string;
  nickname: string;
  profileImage: string;
}

// 회원가입 요청 함수
export const signupUser = async (formData: SignupForm) => {
  const response = await api.post('/member/join', {
    email: formData.email,
    password: formData.password,
    nickname: formData.nickname,
    profile_image: formData.profileImage,
  });
  return response.data;
};

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user_pk: number;
}

export const loginUser = async (
  loginData: LoginForm
): Promise<LoginResponse> => {
  const response = await api.post('/member/login', {
    email: loginData.email,
    password: loginData.password,
  });
  return response.data;
};

export const fetchUserInfo = async () => {
  const response = await api.get('/mypage');
  return response.data;
};

export const fetchCafeDetail = async (
  cafeId: number
): Promise<CafeInfoType> => {
  try {
    const response = await api.get(`/cafe/detail/${cafeId}`);
    const cafeData = response.data.cafe[0];

    return {
      id: cafeData.id,
      cafeName: cafeData.cafe_name,
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
