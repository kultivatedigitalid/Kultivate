export interface NavItem {
  label: string;
  route: string;
}

export const navigationData: Record<'id' | 'en', NavItem[]> = {
  id: [
    { label: 'Portofolio', route: '/id/work/' },
    { label: 'Layanan', route: '/id/services/' },
    { label: 'About Us', route: '/id/about/' },
    { label: 'Blog', route: '/id/insights/' }
  ],
  en: [
    { label: 'Portfolio', route: '/en/work/' },
    { label: 'Services', route: '/en/services/' },
    { label: 'About Us', route: '/en/about/' },
    { label: 'Blog', route: '/en/insights/' }
  ]
};
