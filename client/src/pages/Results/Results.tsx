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

  return (
    <Page back={true}>
      {!date ? (
        <div className='results-container'> 
          <div className='result-error'>
            <h1 className='title-gradient'>{t('main.title')}</h1>
            <p>{t('results.selectDateTitle')}</p>
            <p>{t('results.selectDateDesc')}</p>
            <Link className="back-link" to={'/'}>
              <span>{t('results.backButton')}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className='results-container'>
          <ul className='results-tabs'>
            {routes.map((route) => (
              <li className="results-item" key={route.path}>
                <Link className="results-link" to={route.path}>
                  {route.icon && <span className="results-icon">{route.icon}</span>}
                  {route.titleKey && <span>{t(route.titleKey)}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className='results-date'>
            <h1>{date}</h1>
          </div>
          <Outlet />
        </div>      
      )}
    </Page>
  );
};