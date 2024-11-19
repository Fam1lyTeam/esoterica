import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import '@/localization/i18n';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/Root.tsx';
import { EnvUnsupported } from '@/components/EnvUnsupported.tsx';
import { init } from '@/core/init';

import '@telegram-apps/telegram-ui/dist/styles.css';

// Mock the environment in case, we are outside Telegram.
//import '@/core/mockEnv';

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
  root.render(<EnvUnsupported/>);
}
