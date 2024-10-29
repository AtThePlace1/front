import { create } from 'zustand';

export interface LoginForm {
  email: string;
  password: string;
}

interface AuthStore {
  loginData: LoginForm;
  setLoginData: (field: keyof LoginForm, value: string) => void;
  clearLoginData: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
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

export default useAuthStore;
