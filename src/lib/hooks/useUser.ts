import {useEffect, useState} from 'react';
import {User} from '../types/accessControl/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useGetProfileImage} from '../api/tanstackQuery/imageRequests';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string[] | null>(
    null,
  );

  const {data: profileImage, error: profileImageError} = useGetProfileImage(
    user?.id || '',
  );

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

  useEffect(() => {
    if (profileImage && profileImage.documento) {
      setUserProfileImage(profileImage.documento);
    }
  }, [profileImage]);

  useEffect(() => {
    if (profileImageError) {
      console.error('Erro ao buscar imagem de perfil: ', profileImageError);
    }
  }, [profileImageError]);

  return {user, userProfileImage};
};

export default useUser;
