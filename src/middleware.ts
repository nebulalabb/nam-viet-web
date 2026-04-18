import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Chạy trước mỗi requestđể kiểm tra các điều kiện cần thiết
export function middleware(request: NextRequest) {
  // Website hiện tại không còn sử dụng chức năng đăng nhập
  // Cho phép tất cả request đi tiếp
  return NextResponse.next();
}

// Config matcher để loại trừ các file tĩnh, ảnh, api...
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)",
  ],
};
