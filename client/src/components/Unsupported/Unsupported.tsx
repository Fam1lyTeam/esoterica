import { AppRoot } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams, isColorDark, isRGB } from '@telegram-apps/sdk-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { publicUrl } from '@/core/publicUrl';

import './Unsupported.css';

export const Unsupported: React.FC = () => {
  
  const { t } = useTranslation();

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
            <h1>{t('envUnsupported.header')}</h1>
            <p>{t('envUnsupported.description')}</p>
          </div>
        </main>
      </div>
    </AppRoot>
  );
}