import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const useFetchProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => axiosInstance.get('/api/products').then(res => res.data),
  })
}