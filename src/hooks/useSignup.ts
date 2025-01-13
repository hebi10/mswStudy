import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { AxiosResponse } from 'axios';

interface SignupData {
  username: string;
  password: string;
  nickname: string;
}

interface UserData {
  id: string;
  nickname: string;
  image: string;
  isLoggedIn: boolean;
}

export const useSignup = (): UseMutationResult<UserData, Error, SignupData, unknown> => {
  return useMutation<UserData, Error, SignupData, unknown>({
    mutationFn: async (data: SignupData) => {
      const response: AxiosResponse<UserData> = await axiosInstance.post<UserData>('/api/users', data);
      return response.data;
    }
  });
};