import { useTranslation } from 'react-i18next';
import { Page } from '@/components/Page.tsx';

import './Friends.css';

export const Friends: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page back={false}>
      <div className="friends-container"> 
        <h1 className="title-gradient">{t('friends.title')}</h1>
        <div className="developer-image"></div>
        <div className="developer-text">      
          <p>{t('friends.firstText')}</p>
          <p>{t('friends.secondText')}</p>
        </div>
      </div>
    </Page>
  );
};