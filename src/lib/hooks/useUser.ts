import {useEffect, useState} from 'react';
import {User} from '../types/user';
import EncryptedStorage from 'react-native-encrypted-storage';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userJson = await EncryptedStorage.getItem('user');
        userJson && setUser(JSON.parse(userJson));
      } catch (error) {
        console.error('Erro ao acessar os dados do usuário: ', error);
      }
    };

    getUser();
  }, []);

  return {user};
};

export default useUser;
