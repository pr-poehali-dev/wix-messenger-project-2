import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

const SettingsView = () => {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [theme, setTheme] = useState('dark');

  const themes = [
    { id: 'dark', name: 'Тёмная', icon: 'Moon', gradient: 'from-purple-600 to-pink-600' },
    { id: 'light', name: 'Светлая', icon: 'Sun', gradient: 'from-blue-400 to-cyan-400' },
    { id: 'gradient', name: 'Градиент', icon: 'Sparkles', gradient: 'from-orange-500 via-pink-500 to-purple-600' },
    { id: 'ocean', name: 'Океан', icon: 'Waves', gradient: 'from-blue-600 to-teal-500' },
  ];

  return (
    <div className="h-[calc(100vh-180px)] overflow-auto p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Bell" className="text-primary" />
            Уведомления
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Уведомления</p>
                <p className="text-sm text-muted-foreground">Получать push-уведомления</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Звуки</p>
                <p className="text-sm text-muted-foreground">Звуковые сигналы</p>
              </div>
              <Switch checked={sounds} onCheckedChange={setSounds} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Вибрация</p>
                <p className="text-sm text-muted-foreground">Виброотклик</p>
              </div>
              <Switch checked={vibration} onCheckedChange={setVibration} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Palette" className="text-primary" />
            Темы оформления
          </h3>
          <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
            {themes.map((t) => (
              <div key={t.id} className="flex items-center space-x-3">
                <RadioGroupItem value={t.id} id={t.id} />
                <Label
                  htmlFor={t.id}
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${t.gradient} flex items-center justify-center`}>
                    <Icon name={t.icon as any} className="text-white" />
                  </div>
                  <span className="font-medium">{t.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Shield" className="text-primary" />
            Конфиденциальность
          </h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 border-primary/30"
              onClick={() => toast({ title: 'Изменение пароля', description: 'Функция скоро будет доступна' })}
            >
              <Icon name="Lock" className="mr-3" />
              Изменить пароль
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 border-primary/30"
              onClick={() => toast({ title: 'Конфиденциальность', description: 'Ваш профиль видят только ваши контакты' })}
            >
              <Icon name="Eye" className="mr-3" />
              Кто видит мой профиль
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 border-primary/30"
              onClick={() => toast({ title: 'Заблокированные', description: 'У вас нет заблокированных пользователей' })}
            >
              <Icon name="UserCheck" className="mr-3" />
              Заблокированные пользователи
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Database" className="text-primary" />
            Данные и хранилище
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Использовано</p>
                <p className="text-sm text-muted-foreground">2.4 GB из 5 GB</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold gradient-text">48%</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary w-[48%]"></div>
            </div>
            <Button 
              variant="outline" 
              className="w-full h-12 border-primary/30"
              onClick={() => toast({ title: 'Кэш очищен', description: 'Освобождено 1.2 GB' })}
            >
              <Icon name="Trash2" className="mr-2" />
              Очистить кэш
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Info" className="text-primary" />
            О приложении
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Версия</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Последнее обновление</span>
              <span className="font-medium">12 января 2026</span>
            </div>
          </div>
        </Card>

        <Button 
          variant="destructive" 
          className="w-full h-12"
          onClick={() => toast({ title: 'Выход', description: 'До скорой встречи!' })}
        >
          <Icon name="LogOut" className="mr-2" />
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};

export default SettingsView;