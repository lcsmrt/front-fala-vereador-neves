import {useEffect, useState} from 'react';
import {User} from '../types/accessControl/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  useActionableGetProfileImage,
} from '../api/tanstackQuery/imageRequests';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  const {mutate: getProfileImage, data: profileImage} =
    useActionableGetProfileImage();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userJson = await EncryptedStorage.getItem('user');
        if(userJson) {
          const storedUser = JSON.parse(userJson);
          setUser(storedUser);
          if (storedUser.anexo?.pk) {
            getProfileImage(storedUser.anexo.pk);
          }
        };
      } catch (error) {
        console.error('Erro ao acessar os dados do usuário: ', error);
      }
    };

    getUser();
  }, [trigger]);

  useEffect(() => {
    if (profileImage && profileImage.documento) {
      setUserProfileImage(profileImage.documento);
    }
  }, [profileImage]);

  return {user, userProfileImage, setTrigger};
};

export default useUser;
