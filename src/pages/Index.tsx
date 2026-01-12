import { useState } from 'react';
import RegistrationFlow from '@/components/RegistrationFlow';
import MainApp from '@/components/MainApp';

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleRegistrationComplete = (data: any) => {
    setUserData(data);
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {!isRegistered ? (
        <RegistrationFlow onComplete={handleRegistrationComplete} />
      ) : (
        <MainApp userData={userData} />
      )}
    </div>
  );
};

export default Index;
