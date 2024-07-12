import {useEffect, useState} from 'react';
import {User} from '../types/accessControl/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useActionableGetAttachmentByName} from '../api/tanstackQuery/imageRequests';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  const {mutate: getProfileImage, data: profileImage} =
    useActionableGetAttachmentByName();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userJson = await EncryptedStorage.getItem('user');
        if (userJson) {
          const storedUser = JSON.parse(userJson);
          setUser(storedUser);
          if (storedUser.caminhoImagem) {
            getProfileImage(storedUser.caminhoImagem);
          }
        }
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
