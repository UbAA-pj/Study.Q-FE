import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1000px] flex flex-col flex-1">
        {/* Header */}

        {/* Page */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
