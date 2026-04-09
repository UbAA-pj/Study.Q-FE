import { Link, useMatches } from 'react-router-dom';

const Breadcrumb = () => {
  const matches = useMatches();
  const crumbs = matches.filter((match) => match.handle?.breadcrumb);

  return (
    <nav className="flex items-center gap-1">
      {crumbs.map((crumb, index) => (
        <p key={crumb.id} className="flex items-center gap-1">
          {index < crumbs.length - 1 ? (
            <>
              <Link to={crumb.pathname} style={{ color: 'var(--base-100)' }}>
                {crumb.handle.breadcrumb}
              </Link>
              <span style={{ color: 'var(--base-300)' }}>&gt;</span>
            </>
          ) : (
            <span style={{ color: 'var(--text-main)' }}>{crumb.handle.breadcrumb}</span>
          )}
        </p>
      ))}
    </nav>
  );
};

export default Breadcrumb;
