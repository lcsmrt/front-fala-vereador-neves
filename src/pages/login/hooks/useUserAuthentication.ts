import {useEffect} from 'react';
import {
  AuthenticateUserParams,
  useAuthenticateUser,
} from '../../../lib/api/tanstackQuery/accessControlRequests';
import useValidation from '../../../lib/hooks/useValidation';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenNavigationProp} from '../../../lib/types/system/navigation';
import {useToastContext} from '../../../lib/contexts/useToastContext';

const useUserAuthentication = () => {
  const navigation: LoginScreenNavigationProp = useNavigation();

  const {
    values: credentials,
    handleChange: handleCredentialsChange,
    errors: credentialErrors,
    validateForm: validateCredentials,
  } = useValidation(
    {
      login: value => (value ? null : 'Campo obrigatório'),
      senha: value => (value ? null : 'Campo obrigatório'),
    },
    {
      login: '',
      senha: '',
    },
  );

  const {
    mutate: authenticateUser,
    isPending: isAuthenticating,
    isSuccess: isAuthenticated,
    data: authenticatedUser,
    error: authenticationError,
  } = useAuthenticateUser();

  const handleLogin = () => {
    if (validateCredentials()) {
      authenticateUser(credentials as AuthenticateUserParams);
    }
  };

  const {setIsLoading} = useLoadingContext();
  const {showToast} = useToastContext();

  useEffect(() => {
    setIsLoading(isAuthenticating);
  }, [isAuthenticating, setIsLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      const storeUser = async () => {
        try {
          const jsonUser = JSON.stringify(authenticatedUser.usuario);
          await EncryptedStorage.setItem('user', jsonUser);
          await EncryptedStorage.setItem('token', authenticatedUser.token);
        } catch (error) {
          showToast('Erro ao armazenar os dados do usuário', 'error');
        }
      };

      storeUser();

      navigation.replace('Home');
    }
  }, [isAuthenticated, authenticatedUser]);

  useEffect(() => {
    if (authenticationError) {
      showToast(`Erro ao autenticar usuário`, 'error');
    }
  }, [authenticationError]);

  useEffect(() => {
    const checkIfUserIsAuthenticated = async () => {
      const user = await EncryptedStorage.getItem('user');
      const token = await EncryptedStorage.getItem('token');

      if (user && token) {
        navigation.replace('Home');
      }
    };

    checkIfUserIsAuthenticated();
  }, []);

  return {
    credentials,
    handleCredentialsChange,
    credentialErrors,
    handleLogin,
    authenticationError,
  };
};

export default useUserAuthentication;
