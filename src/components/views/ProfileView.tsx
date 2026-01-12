import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const ProfileView = ({ userData }: any) => {
  return (
    <div className="h-[calc(100vh-180px)] overflow-auto p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card className="p-8 text-center border-primary/30">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full gradient-primary flex items-center justify-center text-6xl border-4 border-primary/30">
              {userData.avatar}
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">{userData.nickname}</h2>
          <p className="text-lg text-muted-foreground mb-1">@{userData.username}</p>
          <p className="text-sm text-muted-foreground mb-6">{userData.phone}</p>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge variant="outline" className="border-primary/30">
              <Icon name="Users" size={14} className="mr-1" />
              324 контакта
            </Badge>
            <Badge variant="outline" className="border-primary/30">
              <Icon name="MessageSquare" size={14} className="mr-1" />
              1.2K сообщений
            </Badge>
          </div>

          <Button className="w-full gradient-primary text-white font-semibold h-12 hover:opacity-90">
            <Icon name="Crown" className="mr-2" />
            Подключить Premium за 299₽
          </Button>
        </Card>

        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="Zap" className="text-primary" />
            Преимущества Premium
          </h3>
          <div className="space-y-3">
            {[
              'Без рекламы и ограничений',
              'Эксклюзивные темы и стикеры',
              'Увеличенный размер файлов до 4GB',
              'Приоритетная поддержка 24/7',
              'Уникальный значок в профиле',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <Icon name="Check" size={18} className="text-white" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="CreditCard" className="text-primary" />
            Способы оплаты
          </h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full h-14 justify-start border-primary/30">
              <Icon name="Smartphone" className="mr-3 text-primary" />
              <div className="text-left">
                <div className="font-semibold">СБП (Система быстрых платежей)</div>
                <div className="text-xs text-muted-foreground">Мгновенный перевод</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full h-14 justify-start border-primary/30">
              <Icon name="CreditCard" className="mr-3 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Банковская карта</div>
                <div className="text-xs text-muted-foreground">Visa, MasterCard, МИР</div>
              </div>
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="text-green-500" size={32} />
              <div>
                <h4 className="font-semibold">Защищенные платежи</h4>
                <p className="text-sm text-muted-foreground">SSL-шифрование и безопасность</p>
              </div>
            </div>
            <Icon name="Check" className="text-green-500" size={32} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileView;
