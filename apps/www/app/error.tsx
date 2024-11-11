'use client';

import { useEffect } from 'react';

import { ErrorTemplate } from '@/www/ui/error';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorPage({ error }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorTemplate />;
}

export default ErrorPage;
