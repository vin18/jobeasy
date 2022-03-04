import { MySocial, Settings } from '../components';

const SettingsPage = () => {
  return (
    <div className="pt-24 min-h-screen container mx-auto bg-gray-50 w-2/5">
      <Settings />
      <MySocial />
    </div>
  );
};

export default SettingsPage;
