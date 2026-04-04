import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cộng đồng & Tin tức',
  description: 'Tin tức thị trường, chia sẻ kinh nghiệm sản xuất, thông tin hữu ích và video hướng dẫn đến từ cộng đồng Nam Việt.',
  alternates: {
    canonical: 'https://namviet.com/community',
  },
  openGraph: {
    title: 'Cộng đồng & Tin tức | Nam Việt',
    description: 'Cập nhật diễn biến thị trường, chia sẻ sản xuất cùng cộng đồng Nam Việt.',
    url: 'https://namviet.com/community',
  }
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
