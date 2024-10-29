import axios from 'axios';
import api from './api';

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
