import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ChatsView from './views/ChatsView';
import ContactsView from './views/ContactsView';
import CallsView from './views/CallsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';

interface MainAppProps {
  userData: any;
}

const MainApp = ({ userData }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState('chats');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="gradient-primary p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">WIX</h1>
          <button 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-right">
              <p className="text-white font-semibold">{userData.nickname}</p>
              <p className="text-white/70 text-sm">@{userData.username}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl border-2 border-white/30">
              {userData.avatar}
            </div>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {activeTab === 'chats' && <ChatsView userData={userData} />}
        {activeTab === 'contacts' && <ContactsView />}
        {activeTab === 'calls' && <CallsView />}
        {activeTab === 'profile' && <ProfileView userData={userData} />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      <nav className="border-t border-border bg-card sticky bottom-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-20 grid grid-cols-5 bg-transparent rounded-none">
            <TabsTrigger
              value="chats"
              className="flex-col gap-1 data-[state=active]:gradient-primary data-[state=active]:text-white"
            >
              <Icon name="MessageSquare" size={24} />
              <span className="text-xs">Чаты</span>
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="flex-col gap-1 data-[state=active]:gradient-primary data-[state=active]:text-white"
            >
              <Icon name="Users" size={24} />
              <span className="text-xs">Контакты</span>
            </TabsTrigger>
            <TabsTrigger
              value="calls"
              className="flex-col gap-1 data-[state=active]:gradient-primary data-[state=active]:text-white"
            >
              <Icon name="Phone" size={24} />
              <span className="text-xs">Звонки</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex-col gap-1 data-[state=active]:gradient-primary data-[state=active]:text-white"
            >
              <Icon name="User" size={24} />
              <span className="text-xs">Профиль</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex-col gap-1 data-[state=active]:gradient-primary data-[state=active]:text-white"
            >
              <Icon name="Settings" size={24} />
              <span className="text-xs">Настройки</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </div>
  );
};

export default MainApp;