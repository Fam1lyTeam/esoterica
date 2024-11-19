import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { App } from './components/App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { publicUrl } from './core/publicUrl.ts';
import { useTranslation } from 'react-i18next';

function ErrorBoundaryError({ error }: { error: unknown }) {
  const { t } = useTranslation();

  if (import.meta.env.PROD) {
    return (
      <div>
        <p>{t('ErrorBoundary.message')}</p>
      </div>
    );
  }

  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider
        manifestUrl={publicUrl('tonconnect-manifest.json')}
      >
        <App/>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
