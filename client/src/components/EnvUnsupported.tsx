import { Placeholder, AppRoot } from '@telegram-apps/telegram-ui';
import { retrieveLaunchParams, isColorDark, isRGB } from '@telegram-apps/sdk-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { publicUrl } from '@/core/publicUrl';

export function EnvUnsupported() {
  
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
      <Placeholder
        header={t('envUnsupported.header')}
        description={t('envUnsupported.description')}
      >
        <img
          alt="sticker"
          src={publicUrl('oops.png')}
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    </AppRoot>
  );
}