"use client";

import React from "react";

/**
 * AuthProvider đã bị vô hiệu hóa vì ứng dụng không còn sử dụng chức năng đăng nhập.
 * Hiện tại nó chỉ đóng vai trò là một Wrapper rỗng để tránh lỗi import.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
