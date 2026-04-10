import { Link, useMatches } from 'react-router-dom';

const Breadcrumb = () => {
  const matches = useMatches();

  if (matches.some((match) => match.handle?.hideBreadcrumb)) return null;

  const crumbs = matches.filter((match) => match.handle?.breadcrumb);

  return (
    <nav className="flex items-center gap-1">
      {crumbs.map((crumb, index) => (
        <p key={crumb.id} className="flex items-center gap-1">
          {index < crumbs.length - 1 ? (
            <>
              <Link to={crumb.pathname} className="text-base-100">
                {crumb.handle.breadcrumb}
              </Link>
              <span className="text-base-100">&gt;</span>
            </>
          ) : (
            <Link to={crumb.pathname} reloadDocument className="text-text-main">
              {crumb.handle.breadcrumb}
            </Link>
          )}
        </p>
      ))}
    </nav>
  );
};

export default Breadcrumb;
