import { Link, useMatches } from 'react-router-dom';

const Breadcrumb = () => {
  const matches = useMatches();
  const crumbs = matches.filter((match) => match.handle?.breadcrumb);

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500">
      {crumbs.map((crumb, index) => (
        <span key={crumb.id} className="flex items-center gap-1">
          {index < crumbs.length - 1 ? (
            <>
              <Link to={crumb.pathname} className="hover:text-gray-800">
                {crumb.handle.breadcrumb}
              </Link>
              <span>&gt;</span>
            </>
          ) : (
            <span>{crumb.handle.breadcrumb}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
