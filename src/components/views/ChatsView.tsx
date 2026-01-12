import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const ChatsView = ({ userData }: any) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '10:30' },
    { id: 2, text: 'Отлично! А у тебя?', sender: 'me', time: '10:32' },
    { id: 3, text: 'Тоже супер! Что планируешь на выходные?', sender: 'other', time: '10:35' },
  ]);

  const [chats] = useState<Chat[]>([
    { id: 1, name: 'Анна Смирнова', avatar: '👩', lastMessage: 'Тоже супер! Что планируешь...', time: '10:35', unread: 2 },
    { id: 2, name: 'Команда WIX', avatar: '🚀', lastMessage: 'Новые функции уже доступны!', time: 'Вчера', unread: 5 },
    { id: 3, name: 'Дмитрий Петров', avatar: '👨', lastMessage: 'Созвонимся завтра?', time: 'Вчера', unread: 0 },
    { id: 4, name: 'Мама ❤️', avatar: '💕', lastMessage: 'Не забудь позвонить', time: '15 янв', unread: 0 },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: messageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  if (!selectedChat) {
    return (
      <div className="h-[calc(100vh-180px)] p-4">
        <div className="mb-4">
          <Input
            placeholder="Поиск чатов..."
            className="h-12 bg-muted/50 border-primary/30"
          />
        </div>
        <ScrollArea className="h-[calc(100%-4rem)]">
          <div className="space-y-2">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] border-primary/20"
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-2xl">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-xs text-white font-bold">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedChat(null)}
            >
              <Icon name="ArrowLeft" />
            </Button>
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xl">
              {selectedChat.avatar}
            </div>
            <div>
              <h3 className="font-semibold">{selectedChat.name}</h3>
              <p className="text-xs text-muted-foreground">онлайн</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Video" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Phone" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-3 ${
                  message.sender === 'me'
                    ? 'gradient-primary text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Paperclip" />
          </Button>
          <Input
            placeholder="Сообщение..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-12 bg-muted/50 border-primary/30"
          />
          <Button variant="ghost" size="icon">
            <Icon name="Mic" />
          </Button>
          <Button
            size="icon"
            onClick={handleSendMessage}
            className="gradient-primary text-white h-12 w-12"
          >
            <Icon name="Send" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatsView;
