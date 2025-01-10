import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux"
import axiosInstance from "../api/axios";
import { logout } from "../features/user/userSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () => axiosInstance.post('/api/logout'),
    onSuccess: () => {
      dispatch(logout());
    }
  });
}