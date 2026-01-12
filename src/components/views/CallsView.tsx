import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const CallsView = () => {
  const calls = [
    { id: 1, name: 'Анна Смирнова', avatar: '👩', type: 'video', direction: 'incoming', time: '10:35', duration: '15 мин' },
    { id: 2, name: 'Дмитрий Петров', avatar: '👨', type: 'voice', direction: 'outgoing', time: 'Вчера', duration: '5 мин' },
    { id: 3, name: 'Мама ❤️', avatar: '💕', type: 'voice', direction: 'incoming', time: '15 янв', duration: '32 мин' },
    { id: 4, name: 'Елена Иванова', avatar: '👱‍♀️', type: 'video', direction: 'missed', time: '14 янв', duration: 'Пропущен' },
    { id: 5, name: 'Команда WIX', avatar: '🚀', type: 'voice', direction: 'outgoing', time: '13 янв', duration: '8 мин' },
  ];

  const getCallIcon = (type: string, direction: string) => {
    if (direction === 'missed') return <Icon name="PhoneMissed" className="text-destructive" />;
    if (type === 'video') return <Icon name="Video" className="text-primary" />;
    return <Icon name="Phone" className="text-primary" />;
  };

  return (
    <div className="h-[calc(100vh-180px)] p-4">
      <ScrollArea className="h-full">
        <div className="space-y-2">
          {calls.map((call) => (
            <Card
              key={call.id}
              className="p-4 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] border-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-2xl">
                  {call.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{call.name}</h3>
                    {getCallIcon(call.type, call.direction)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{call.time}</span>
                    <span>•</span>
                    <span>{call.duration}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {call.type === 'video' ? (
                    <Button variant="ghost" size="icon" className="text-primary">
                      <Icon name="Video" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon" className="text-primary">
                      <Icon name="Phone" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="fixed bottom-24 right-6">
        <Button
          size="icon"
          className="w-16 h-16 rounded-full gradient-primary text-white shadow-lg hover:scale-110 transition-transform"
        >
          <Icon name="PhonePlus" size={28} />
        </Button>
      </div>
    </div>
  );
};

export default CallsView;
