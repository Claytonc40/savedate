import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from 'next';
import TenantSettings from '../_components/Dashboard/settings';

export const metadata: Metadata = {
  title: 'Settings | BurgerMetrics',
  description: "BurgerMetrics is a tool for analyzing KPI's indicators",
};

const Settings = () => {
  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />
      <TenantSettings />
    </div>
  );
};

export default Settings;
