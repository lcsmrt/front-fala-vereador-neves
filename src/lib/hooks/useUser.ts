import {useEffect, useState} from 'react';
import {User} from '../types/accessControl/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  useActionableGetProfileImage,
} from '../api/tanstackQuery/imageRequests';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  const {mutate: getProfileImage, data: profileImage} =
    useActionableGetProfileImage();

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
    if (user && user?.anexo?.pk) {
      getProfileImage(user.anexo.pk);
    }
  }, [user]);

  useEffect(() => {
    if (profileImage && profileImage.documento) {
      setUserProfileImage(profileImage.documento);
    }
  }, [profileImage]);

  return {user, userProfileImage};
};

export default useUser;
