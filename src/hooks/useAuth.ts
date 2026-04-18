import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();

  // Chức năng đã bị vô hiệu hóa
  const logout = useCallback(async () => {
    authStore.logout();
    console.warn("Logout called but auth is disabled.");
  }, [authStore]);

  const requireAuth = useCallback(() => {
    return true; // Luôn trả về true để không bị chặn
  }, []);

  const redirectIfAuthenticated = useCallback(() => {
    return false; // Không bao giờ redirect vì "đã authenticated"
  }, []);

  return {
    // State (Neutral)
    user: null,
    token: null,
    isAuthenticated: false,

    // Actions (No-op)
    login: () => {},
    logout,
    setUser: () => {},
    setToken: () => {},

    // Permissions (Always true for public site)
    hasPermission: () => true,
    hasAnyPermission: () => true,
    hasAllPermissions: () => true,
    isRole: () => false,

    // Helpers
    requireAuth,
    redirectIfAuthenticated,
  };
}
