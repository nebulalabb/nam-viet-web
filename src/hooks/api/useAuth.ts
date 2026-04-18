import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores";
import { toast } from "react-hot-toast";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

// Chức năng Auth đã bị vô hiệu hóa toàn bộ ở phía Frontend
export function useLogin() {
  return useMutation({
    mutationFn: async () => {
      console.warn("Auth is disabled.");
      throw new Error("Chức năng đăng nhập hiện không khả dụng.");
    },
  });
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: async () => {
      throw new Error("Chức năng xác thực OTP hiện không khả dụng.");
    },
  });
}

export function useResendOTP() {
  return useMutation({
    mutationFn: async () => {
      throw new Error("Chức năng gửi lại OTP hiện không khả dụng.");
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      // Chỉ clear state ở frontend
      logout();
    },
    onSuccess: () => {
      toast.success("Đã xóa phiên làm việc.");
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => null,
    enabled: false, // Luôn disable
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async () => {
      throw new Error("Chức năng quên mật khẩu hiện không khả dụng.");
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async () => {
      throw new Error("Chức năng đặt lại mật khẩu hiện không khả dụng.");
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async () => {
      throw new Error("Chức năng đổi mật khẩu hiện không khả dụng.");
    },
  });
}
