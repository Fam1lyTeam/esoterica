import { Outlet } from 'react-router-dom';
import { getResultsRoutes } from '@/core/routes';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/Link/Link';
import { useDate } from '@/core/DateContext';
import { Page } from '@/components/Page';

import './Results.css';

export const Results: React.FC = () => {
  const routes = getResultsRoutes();
  const { t } = useTranslation();
  const { date } = useDate();

  const calculateAgeWithSuffix = (birthDate: string): string => {
    const [day, month, year] = birthDate.split('.').map(Number);
    const today = new Date();
    const birth = new Date(year, month - 1, day);
  
    let age = today.getFullYear() - birth.getFullYear();
  
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
      age--;
    }
  
    const getAgeSuffix = (age: number): string => {
      const lastDigit = age % 10;
      const lastTwoDigits = age % 100;
  
      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "лет";
      }
      if (lastDigit === 1) {
        return "год";
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
        return "года";
      }
      return "лет";
    };
  
    return `${age} ${getAgeSuffix(age)}`;
  };
  

  return (
    <Page back={true}>
      {!date ? (
        <div className="results-container"> 
          <div className="result-error">
            <h1 className="title-gradient">{t('main.title')}</h1>
            <p>{t('results.selectDateTitle')}</p>
            <p>{t('results.selectDateDesc')}</p>
            <Link className="back-link" to={'/'}>
              <span>{t('results.backButton')}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="results-container">
          <div className="results-tabs">
            {routes.map((route) => (
              <Link className="results-item" to={route.path} key={route.path}>
                {route.icon && <span className="results-icon">{route.icon}</span>}
                {route.titleKey && <span>{t(route.titleKey)}</span>}
              </Link>
            ))}
          </div>
          <div className="results-date">
            <h1><span>{date}</span><span>{calculateAgeWithSuffix(date)}</span></h1>
          </div>
          <Outlet />
        </div>      
      )}
    </Page>
  );
};