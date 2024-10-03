import { CatalogTemplate } from '@/invitations/catalog/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '디자인 고르기',
};

function CatalogPage() {
  return <CatalogTemplate />;
}

export default CatalogPage;
