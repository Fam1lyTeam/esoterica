import { useTranslation } from 'react-i18next';
import { Page } from '@/components/Page';

import './Experts.css';

export const Experts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page back={false}>
      <div className="experts-container"> 
        <h1 className="title-gradient">{t('experts.title')}</h1>
        <div className="developer-image"></div>
        <div className="developer-text">      
          <p>{t('experts.firstText')}</p>
          <p>{t('experts.secondText')}</p>
          <p>{t('experts.thirdText')}</p>
          <a href="tg://resolve?domain=Mileenkovae" target="_blank" rel="noopener noreferrer">{t('experts.button')}</a>
        </div>
      </div>
    </Page>
  );
};