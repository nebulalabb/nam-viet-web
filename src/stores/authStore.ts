import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  // Permissions helpers
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  isRole: (role: string) => boolean;
}

// Store đã được vô hiệu hóa vì không còn sử dụng chức năng đăng nhập
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false, // Luôn luôn false
      
      login: () => {
        // Vô hiệu hóa login
        console.warn("Auth functionality is disabled.");
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      setUser: (user) => set({ user }),
      
      setToken: (token) => set({ token }),

      // Mặc định cho phép hoặc chặn tùy theo logic app cũ, 
      // nhưng ở đây chúng ta trả về false/true trung lập
      hasPermission: () => true, 
      hasAnyPermission: () => true,
      hasAllPermissions: () => true,
      isRole: () => false,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
