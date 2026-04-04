import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hàng hóa & Sản phẩm',
  description: 'Khám phá tất cả mặt hàng, vật liệu và thành phẩm chất lượng cao của hệ thống Nam Việt. Chúng tôi cung cấp các sản phẩm đáp ứng tiêu chuẩn sản xuất.',
  alternates: {
    canonical: 'https://namviet.com/showcase',
  },
  openGraph: {
    title: 'Danh mục Sản phẩm | Nam Việt',
    description: 'Kho hàng hóa vật liệu và thành phẩm xuất khẩu, thương mại của Nam Việt.',
    url: 'https://namviet.com/showcase',
  }
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
