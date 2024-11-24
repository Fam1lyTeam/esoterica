import { AppRoot } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams, isColorDark, isRGB } from '@telegram-apps/sdk-react';
import { useMemo } from 'react';
import { publicUrl } from '@/core/publicUrl';

import './Unsupported.css';

export const Unsupported: React.FC = () => {

  const [platform, isDark] = useMemo(() => {
    let platform = 'base';
    let isDark = false;
    try {
      const lp = retrieveLaunchParams();
      const { bgColor } = lp.themeParams;
      platform = lp.platform;
      isDark = bgColor && isRGB(bgColor) ? isColorDark(bgColor) : false;
    } catch { /* empty */
    }

    return [platform, isDark];
  }, []);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(platform) ? 'ios' : 'base'}
    >
      <div className="body-container">
        <main className="main-container">
          <div className='unsupported'>
            <img alt="sticker" src={publicUrl('oops.png')}/>
            <h1>Oops...</h1>
            <p>You are using too old Telegram client to run this application</p>
          </div>
        </main>
      </div>
    </AppRoot>
  );
}