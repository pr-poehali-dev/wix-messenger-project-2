import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const ProfileView = ({ userData }: any) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = (method: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: '✅ Оплата успешна!',
        description: `Premium подписка активирована через ${method === 'sbp' ? 'СБП' : 'карту'}. Деньги поступили на ваш счёт.`,
      });
      setShowPaymentDialog(false);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-180px)] overflow-auto p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card className="p-8 text-center border-primary/30">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full gradient-primary flex items-center justify-center text-6xl border-4 border-primary/30">
              {userData.avatar}
            </div>
            {userData.is_premium && (
              <div className="mt-2">
                <Badge className="gradient-primary text-white">
                  <Icon name="Crown" size={12} className="mr-1" />
                  Premium
                </Badge>
              </div>
            )}
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

          {!userData.is_premium && (
            <Button 
              onClick={() => setShowPaymentDialog(true)}
              className="w-full gradient-primary text-white font-semibold h-12 hover:opacity-90"
            >
              <Icon name="Crown" className="mr-2" />
              Подключить Premium за 299₽
            </Button>
          )}
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

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">Выберите способ оплаты</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button
              variant="outline"
              className="w-full h-16 justify-start border-primary/30 hover:bg-primary/10"
              onClick={() => handlePayment('sbp')}
              disabled={isProcessing}
            >
              <Icon name="Smartphone" className="mr-3 text-primary" size={24} />
              <div className="text-left">
                <div className="font-semibold">СБП (Система быстрых платежей)</div>
                <div className="text-xs text-muted-foreground">Мгновенный перевод — 299₽</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full h-16 justify-start border-primary/30 hover:bg-primary/10"
              onClick={() => handlePayment('card')}
              disabled={isProcessing}
            >
              <Icon name="CreditCard" className="mr-3 text-primary" size={24} />
              <div className="text-left">
                <div className="font-semibold">Банковская карта</div>
                <div className="text-xs text-muted-foreground">Visa, MasterCard, МИР — 299₽</div>
              </div>
            </Button>
          </div>
          {isProcessing && (
            <div className="text-center mt-4">
              <p className="text-muted-foreground">Обработка платежа...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileView;