import {useEffect, useState} from 'react';
import {useUpdateUser} from '../../../lib/api/tanstackQuery/accessControlRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import useUser from '../../../lib/hooks/useUser';
import useValidation from '../../../lib/hooks/useValidation';
import {User} from '../../../lib/types/accessControl/user';
import {useToastContext} from '../../../lib/contexts/useToastContext';
import {Document} from '../../../lib/types/system/document';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useUserUpdateContext} from '../../../lib/contexts/useUserUpdateContext';

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

  const [file, setFile] = useState<Document>();

  const {
    mutate: updateUser,
    isPending: isUpdating,
    isSuccess: isUpdated,
    error: updateError,
    data: updatedUser,
  } = useUpdateUser();

  const handleUpdateUser = () => {
    if (validateUserData() && user?.id) {
      const formattedUserData = {
        ...userData,
        tipoDocumento: userData.doc?.length === 14 ? 'CPF' : 'CNPJ',
        sexo: userData.sexo?.value,
        uf: userData.uf?.sigla,
        cidade: userData.cidade?.nome,
        img: file,
      };

      updateUser({id: user.id, userData: formattedUserData as User});
    }
  };

  const {setIsLoading} = useLoadingContext();
  const {showToast} = useToastContext();
  const {setUserUpdatesCount} = useUserUpdateContext();

  useEffect(() => {
    setIsLoading(isUpdating);
  }, [isUpdating, setIsLoading]);

  useEffect(() => {
    if (isUpdated && updatedUser) {
      showToast('Perfil atualizado com sucesso', 'success');
      EncryptedStorage.setItem('user', JSON.stringify(updatedUser));
      setUserUpdatesCount(prev => prev + 1);
    }
  }, [isUpdated]);

  useEffect(() => {
    if (updateError) {
      const errorMessage = (updateError as any)?.response?.data?.message;

      if (errorMessage) {
        showToast(errorMessage, 'error');
      } else {
        showToast('Erro ao atualizar perfil', 'error');
      }
    }
  }, [updateError]);

  return {
    userData,
    handleUserDataChange,
    file,
    setFile,
    userDataErrors,
    validateUserDataField,
    handleUpdateUser,
    updatedUser,
  };
};

export default useEditUserProfileHandler;
