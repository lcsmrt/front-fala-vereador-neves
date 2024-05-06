import {useEffect} from 'react';
import {useUpdateUser} from '../../../lib/api/tanstackQuery/accessControlRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import useUser from '../../../lib/hooks/useUser';
import useValidation from '../../../lib/hooks/useValidation';
import {User} from '../../../lib/types/accessControl/user';

const useEditUserProfileHandler = () => {
  const {user} = useUser();
  const {
    values: userData,
    handleChange: handleUserDataChange,
    errors: userDataErrors,
    validateField: validateUserDataField,
    validateForm: validateUserData,
  } = useValidation(
    {
      nome: value => (value ? null : 'Campo obrigatório'),
    },
    {
      nome: '',
      endereco: '',
      numero: '',
      complemento: '',
      cidade: '',
      uf: '',
      cep: '',
      telefone: '',
    },
  );

  const {
    mutate: updateUser,
    isPending: isUpdating,
    isSuccess: isUpdated,
    data: updatedUser,
  } = useUpdateUser();

  const handleUpdateUser = () => {
    if (validateUserData() && user?.id) {
      const formattedUserData = {
        ...userData,
        uf: userData.uf?.sigla,
        cidade: userData.cidade?.nome,
      };

      updateUser({id: user.id, userData: formattedUserData as User});
    }
  };

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isUpdating);
  }, [isUpdating, setIsLoading]);

  useEffect(() => {
    
  }, [isUpdated]);

  return {
    userData,
    handleUserDataChange,
    userDataErrors,
    validateUserDataField,
    handleUpdateUser,
  };
};

export default useEditUserProfileHandler;
