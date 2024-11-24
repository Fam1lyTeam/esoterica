import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { App } from './components/App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { publicUrl } from './core/publicUrl.ts';

function ErrorBoundaryError({ error }: { error: unknown }) {

  if (import.meta.env.PROD) {
    return (
      <div>
        <p>{'Something went wrong. Please try again later'}</p>
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
