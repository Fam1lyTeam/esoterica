import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { init } from '@/core/init';
import { Root } from '@/Root.tsx';
import { Unsupported } from '@/components/Unsupported/Unsupported';

// Mock the environment in case, we are outside Telegram.
import '@/core/mockEnv';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

  root.render(
    <StrictMode>
      <Root/>
    </StrictMode>,
  );

} catch (e) {
  root.render(<Unsupported/>);
}
