import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/** 진행바 */
interface Progress {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useProgressBarStore = create<Progress>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
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

export interface CafeInfoType {
  id: number;
  cafeName: string;
  openingHours: string;
  location: string;
  latitude: number;
  longitude: number;
  contactNumber: string;
  sns: string;
}

interface CafeStore {
  cafeInfo: CafeInfoType | null;
  setCafeInfo: (cafe: CafeInfoType) => void;
  clearCafeInfo: () => void;
}

export const useCafeInfoStore = create<CafeStore>((set) => ({
  cafeInfo: null,
  setCafeInfo: (cafe) => set({ cafeInfo: cafe }),
  clearCafeInfo: () => set({ cafeInfo: null }),
}));
