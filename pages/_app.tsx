import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import '@/styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}