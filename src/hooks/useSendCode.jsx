import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import instance from "../api/axiosInstance";

export default function useSendCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(data) => await instance.post(`/auth/Account/SendCode`, { email: data.email }),
    onSuccess:()=>{
        queryClient.invalidateQueries(['forgotPassword']);
        
    },  onError: (error) => {
      console.error("Send code failed:", error);
    },
  });
}