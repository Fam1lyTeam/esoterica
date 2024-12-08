import { useTranslation } from 'react-i18next';
import { Page } from '@/components/Page.tsx';

import './Earn.css';

export const Earn: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page back={false}>
      <div className="earn-container"> 
        <h1 className="title-gradient">{t('earn.title')}</h1>
        <div className="developer-image"></div>
        <div className="developer-text">      
          <p>{t('earn.firstText')}</p>
          <p>{t('earn.secondText')}</p>
        </div>
      </div>
    </Page>
  );
};