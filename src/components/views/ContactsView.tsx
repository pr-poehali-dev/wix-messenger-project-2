import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ContactsView = () => {
  const contacts = [
    { id: 1, name: 'Анна Смирнова', avatar: '👩', phone: '+7 (999) 123-45-67', username: '@anna_s' },
    { id: 2, name: 'Дмитрий Петров', avatar: '👨', phone: '+7 (999) 765-43-21', username: '@dmitry_p' },
    { id: 3, name: 'Елена Иванова', avatar: '👱‍♀️', phone: '+7 (999) 555-12-34', username: '@elena_i' },
    { id: 4, name: 'Сергей Козлов', avatar: '🧔', phone: '+7 (999) 888-99-00', username: '@sergey_k' },
    { id: 5, name: 'Мария Новикова', avatar: '👩‍🦰', phone: '+7 (999) 111-22-33', username: '@maria_n' },
  ];

  return (
    <div className="h-[calc(100vh-180px)] p-4">
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Поиск контактов..."
          className="flex-1 h-12 bg-muted/50 border-primary/30"
        />
        <Button className="gradient-primary text-white h-12">
          <Icon name="UserPlus" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="space-y-2">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className="p-4 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] border-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-2xl">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.username}</p>
                  <p className="text-xs text-muted-foreground">{contact.phone}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="MessageSquare" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Phone" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsView;
