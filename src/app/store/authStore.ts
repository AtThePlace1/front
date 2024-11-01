import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface LoginForm {
  email: string;
  password: string;
}

interface AuthStore {
  loginData: LoginForm;
  setLoginData: (field: keyof LoginForm, value: string) => void;
  clearLoginData: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loginData: {
    email: '',
    password: '',
  },
  setLoginData: (field, value) =>
    set((state) => ({
      loginData: {
        ...state.loginData,
        [field]: value,
      },
    })),
  clearLoginData: () => set({ loginData: { email: '', password: '' } }),
}));

/** 유저 정보 */
export interface UserLikeList {
  cafe_id: number;
  cafe_name: string;
  opening_hours: string;
  contact_number: string;
  location_address: string;
}
interface UserInfo {
  nickname: string;
  profile_image: string;
  likeList: UserLikeList[];
}

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserInfoStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: 'user-info-storage', // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // 기본은 localStorage, 필요에 따라 sessionStorage로 변경 가능
    }
  )
);
