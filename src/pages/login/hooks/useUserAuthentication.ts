import {useEffect} from 'react';
import {
  AuthenticateUserParams,
  useAuthenticateUser,
} from '../../../lib/api/tanstackQuery/accessControl/accessControlRequests';
import useValidation from '../../../lib/hooks/useValidation';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const useUserAuthentication = () => {
  const navigation = useNavigation();

  const {
    values: credentials,
    handleChange: handleCredentialsChange,
    errors: credentialErrors,
    validateForm: validateCredentials,
  } = useValidation({
    login: value => (value ? null : 'Campo obrigatório'),
    senha: value => (value ? null : 'Campo obrigatório'),
  });

  const {
    mutate: authenticateUser,
    isPending: isAuthenticating,
    isSuccess: isAuthenticated,
    data: authenticatedUser,
  } = useAuthenticateUser();

  const handleLogin = () => {
    if (validateCredentials()) {
      authenticateUser(credentials as AuthenticateUserParams);
    }
  };

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isAuthenticating);
  }, [isAuthenticating, setIsLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      const storeUser = async () => {
        try {
          const jsonUser = JSON.stringify(authenticatedUser);
          await EncryptedStorage.setItem('user', jsonUser);
          console.log('Usuário armazenado com sucesso.X');
        } catch (error) {
          console.error('Erro ao armazenar os dados do usuário: ', error);
        }
      };

      storeUser();

      (navigation as NavigationProp<any, any>).navigate('Home');
    }
  }, [isAuthenticated, authenticatedUser]);

  return {
    credentials,
    handleCredentialsChange,
    credentialErrors,
    handleLogin,
  };
};

export default useUserAuthentication;
