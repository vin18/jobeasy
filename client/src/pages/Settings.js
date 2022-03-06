import { MySocial, Settings, ChangePassword } from '../components';

const SettingsPage = () => {
  return (
    <div className="pt-24 min-h-screen container mx-auto bg-gray-50 w-2/5">
      <Settings />
      <MySocial />
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;
