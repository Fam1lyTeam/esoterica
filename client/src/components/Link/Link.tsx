import { classNames, openLink } from '@telegram-apps/sdk-react';
import { type FC, type MouseEventHandler, useCallback } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';

import './Link.css';

export const Link: FC<NavLinkProps> = ({
  className,
  onClick: propsOnClick,
  to,
  ...rest
}) => {
  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((e) => {
    propsOnClick?.(e);

    // Compute if target path is external. In this case we would like to open
    // link using TMA method.
    let path: string;
    if (typeof to === 'string') {
      path = to;
    } else {
      const { search = '', pathname = '', hash = '' } = to;
      path = `${pathname}?${search}#${hash}`;
    }

    const targetUrl = new URL(path, window.location.toString());
    const currentUrl = new URL(window.location.toString());
    const isExternal = targetUrl.protocol !== currentUrl.protocol
      || targetUrl.host !== currentUrl.host;

    if (isExternal) {
      e.preventDefault();
      openLink(targetUrl.toString());
    }
  }, [to, propsOnClick]);

  return (
    <NavLink
      {...rest}
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        classNames(className, 'link', isActive && 'active')
      }
    />
  );
};