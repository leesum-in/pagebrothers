import type { Metadata } from 'next';

import { CatalogTemplate } from '@/widgets/components';

export const metadata: Metadata = {
  title: '디자인 고르기',
};

function CatalogPage() {
  return <CatalogTemplate />;
}

export default CatalogPage;
