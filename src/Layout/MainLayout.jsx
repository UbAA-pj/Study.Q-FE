import { Outlet } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Header from '../components/common/Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-250 flex flex-col flex-1">
        {/* Header */}
        <Header />
        <Breadcrumb />

        {/* Page */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
