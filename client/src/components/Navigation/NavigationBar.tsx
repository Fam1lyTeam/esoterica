import { useTranslatedRoutes } from '@/core/routes';
import { Link } from '@/components/Link/Link';

import './NavigationBar.css';

export const NavigationBar: React.FC = () => {
  const routes = useTranslatedRoutes();

  return (
    <nav className="menu-container">
      <ul className="menu-list">
        {routes.map((route) => (
          <li className="menu-item" key={route.path}>
            <Link className="menu-link" to={route.path}>
              {route.icon && <span className="menu-icon">{route.icon}</span>}
              {route.title && <span>{route.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};



