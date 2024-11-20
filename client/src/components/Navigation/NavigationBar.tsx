import { getNavRoutes } from '@/core/routes';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/Link/Link';

import './NavigationBar.css';

export const NavigationBar: React.FC = () => {
  const routes = getNavRoutes();
  const { t } = useTranslation();

  return (
    <nav className="menu-container">
      <ul className="menu-list">
        {routes.map((route) => (
          <li className="menu-item" key={route.path}>
            <Link className="menu-link" to={route.path}>
              {route.icon && <span className="menu-icon">{route.icon}</span>}
              {route.titleKey && <span>{t(route.titleKey)}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};



