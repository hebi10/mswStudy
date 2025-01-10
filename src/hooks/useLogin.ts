import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useDispatch } from "react-redux"
import axiosInstance from "../api/axios";
import { login } from "../features/user/userSlice";
import { AxiosResponse } from "axios";

interface LoginData {
  nickname: string;
  password: string;
}

interface UserData {
  id: string;
  nickname: string;
  image: string;
  isLoggedIn: boolean;
}

export const useLogin = () => {
  const dispatch = useDispatch();


  return useMutation<UserData, Error, LoginData>({
      mutationFn: async (data: LoginData) => {
        const response: AxiosResponse<UserData> = await axiosInstance.post('/api/login', data);
        return response.data;
      },
      onSuccess: (user: UserData) => {
        dispatch(login(user));
      },
      onError: (error: Error) => {
        console.error("로그인 실패:", error.message);
      }
    }
  );
};