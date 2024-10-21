import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings |  Save-Date',
  description: ' Save-Date é uma Aplicação para gerenciamento de datas.',
};

const Settings = () => {
  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />
    </div>
  );
};

export default Settings;
