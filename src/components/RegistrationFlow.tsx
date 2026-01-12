import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RegistrationFlowProps {
  onComplete: (data: any) => void;
}

const RegistrationFlow = ({ onComplete }: RegistrationFlowProps) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('😊');

  const emojis = ['😊', '😎', '🚀', '💜', '🔥', '⚡', '🌟', '🎨', '🎭', '🎪', '🎯', '💎'];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({ phone, nickname, username, avatar });
    }
  };

  const isStepValid = () => {
    if (step === 1) return phone.length >= 10;
    if (step === 2) return password.length >= 6;
    if (step === 3) return nickname && username;
    if (step === 4) return avatar;
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl"></div>
      
      <Card className="w-full max-w-md p-8 relative z-10 glass border-2 border-primary/30 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">WIX</h1>
          <p className="text-muted-foreground">Шаг {step} из 4</p>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                s <= step ? 'gradient-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <Icon name="Phone" size={48} className="mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-semibold">Номер телефона</h2>
              </div>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-lg h-14 bg-muted/50 border-primary/30"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <Icon name="Lock" size={48} className="mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-semibold">Создайте пароль</h2>
              </div>
              <Input
                type="password"
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-lg h-14 bg-muted/50 border-primary/30"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <Icon name="User" size={48} className="mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-semibold">Представьтесь</h2>
              </div>
              <Input
                placeholder="Никнейм"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="text-lg h-14 bg-muted/50 border-primary/30"
              />
              <Input
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-lg h-14 bg-muted/50 border-primary/30"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <Icon name="Image" size={48} className="mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-semibold">Выберите аватар</h2>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setAvatar(emoji)}
                    className={`text-4xl h-20 rounded-xl transition-all duration-300 hover:scale-110 ${
                      avatar === emoji
                        ? 'gradient-primary scale-110 shadow-lg'
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full h-14 mt-4 border-primary/30"
                onClick={() => setAvatar('📷')}
              >
                <Icon name="Camera" className="mr-2" />
                Загрузить фото
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1 h-14 border-primary/30"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              Назад
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1 h-14 gradient-primary text-white font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            {step === 4 ? 'Завершить' : 'Далее'}
            {step < 4 && <Icon name="ArrowRight" className="ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RegistrationFlow;
