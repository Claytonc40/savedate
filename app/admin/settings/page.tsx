import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from 'next';
import TenantSettings from '../_components/Dashboard/settings';

export const metadata: Metadata = {
  title: 'Settings |  Save-Date',
  description: ' Save-Date é uma Aplicação para gerenciamento de datas.',
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
