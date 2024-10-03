'use client';

import ExpirationDashboard from './ExpirationDashboard';
import ExpirationTimeline from './ExpirationTimeline';
import ProductsByCategoryChart from './ProductsByCategoryChart';

// Dashboard component
export default function DashboardPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <div className="mx-auto max-w-7xl space-y-4">
        <ExpirationDashboard />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProductsByCategoryChart />

          <ExpirationTimeline />
        </div>
      </div>
    </div>
  );
}
