import { useTranslation } from 'react-i18next';

export const Relationship: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="results-content">
      <h2 className="results-title">{t('results.titles.relationship')}</h2>
      <div className="">

 
      </div>
      <div className="results-comment"></div>
    </div>
  );
};