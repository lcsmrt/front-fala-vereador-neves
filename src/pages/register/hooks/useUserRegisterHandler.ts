import {useNavigation} from '@react-navigation/native';
import {RegisterScreenNavigationProp} from '../../../lib/types/system/navigation';
import useValidation from '../../../lib/hooks/useValidation';
import {useRegisterUser} from '../../../lib/api/tanstackQuery/accessControlRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {User} from '../../../lib/types/user';
import {useEffect} from 'react';

const useUserRegisterHandler = () => {
  const navigation: RegisterScreenNavigationProp = useNavigation();

  const {
    values: userData,
    handleChange: handleUserDataChange,
    errors: userDataErrors,
    validateField: validateUserDataField,
    validateForm: validateUserData,
  } = useValidation(
    {
      nome: value => (value ? null : 'Campo obrigatório'),
      doc: value => {
        if (!value) return 'Campo obrigatório';
        if (value.length === 14 || value.length === 18) return null;
        return 'CPF/CNPJ inválido';
      },
      tipoDocumento: value => (value ? null : 'Campo obrigatório'),
      sexo: value => (value ? null : 'Campo obrigatório'),
      nascimento: value => (value ? null : 'Campo obrigatório'),
      email: value => (value ? null : 'Campo obrigatório'),
      senha: value => (value ? null : 'Campo obrigatório'),
      confirmarSenha: value => {
        if (value !== userData.senha) return 'As senhas não conferem';
        return null;
      },
    },
    {
      nome: '',
      doc: '',
      tipoDocumento: '',
      sexo: '',
      nascimento: '',
      email: '',
      senha: '',
      confirmarSenha: '',
    },
  );

  const {
    mutate: registerUser,
    isPending: isRegistering,
    isSuccess: isRegistered,
    data: registeredUser,
  } = useRegisterUser();

  const handleLogin = () => {
    if (validateUserData()) {
      const formattedUserData = {
        ...userData,
        uf: userData.uf?.sigla,
        cidade: userData.cidade?.nome,
        sexo: userData.sexo?.value,
      };

      registerUser(formattedUserData as User);
    }
  };

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isRegistering);
  }, [isRegistering, setIsLoading]);

  useEffect(() => {
    if (isRegistered) {
      navigation.replace('Login');
    }
  }, [isRegistered, registeredUser]);

  return {
    userData,
    handleUserDataChange,
    userDataErrors,
    validateUserDataField,
    handleLogin,
  };
};

export default useUserRegisterHandler;
