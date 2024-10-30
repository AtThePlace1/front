import axios from 'axios';
import api from './api';
import { CafeInfoType } from '../store/store';

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
  const response = await api.post('member/login', {
    email: loginData.email,
    pwd: loginData.password,
  });
  return response.data;
};

export const fetchUserInfo = async (accessToken: string) => {
  const reponse = await axios.get('http://localhost:10010/mypages/', {
    headers: {
      Authorization: accessToken,
    },
  });
  return reponse.data;
};

export const fetchCafeDetail = async (
  cafeId: number
): Promise<CafeInfoType> => {
  try {
    const response = await axios.get(`/cafe/detail/${cafeId}`);
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
