import {useMutation} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {User} from '../../types/accessControl/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {PasswordReset} from '../../types/accessControl/passwordReset';

// AUTENTICA USUÁRIO
export interface AuthenticateUserParams {
  login: string;
  senha: string;
}

const authenticateUser = async ({login, senha}: AuthenticateUserParams) => {
  const {data} = await httpRequest.post('/login', {login, senha});
  return data;
};

export const useAuthenticateUser = () => {
  return useMutation({mutationFn: authenticateUser});
};

// REGISTRA USUÁRIO
const registerUser = async (userData: User) => {
  const {data} = await httpRequest.post('/usuario_publico', userData);
  return data;
};

export const useRegisterUser = () => {
  return useMutation({mutationFn: registerUser});
};

// ATUALIZA USUÁRIO (SEM IMAGEM)
export interface UpdateUserParams {
  id: string | number;
  userData: User;
}

const updateUser = async ({id, userData}: UpdateUserParams) => {
  const token = await EncryptedStorage.getItem('token');

  try {
    const response = await RNFetchBlob.fetch(
      'PUT',
      `http://198.27.114.51:8083/usuario_publico/${id}`,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      [
        {
          name: 'form',
          data: JSON.stringify(userData),
          type: 'application/json',
        },
      ],
    );

    if (response.respInfo.status >= 400) {
      console.log('Error response:', response.data);
      throw new Error(
        `Erro ao atualizar usuário. Status code: ${response.respInfo.status}`,
      );
    }

    console.log('Usuário atualizado com sucesso: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário: ', error);
  }
};

export const useUpdateUser = () => {
  return useMutation({mutationFn: updateUser});
};

// ENVIA EMAIL DE RECUPERAÇÃO DE SENHA
const sendPasswordRecoveryEmail = async (email: string) => {
  try {
    const {data} = await httpRequest.post(
      `/recuperar_senha/solicitar/${email}`,
    );
    return data;
  } catch (error: any) {
    const errorMessages = error?.response?.data?.message
    if (errorMessages) {
      throw new Error(errorMessages);
    }
    throw new Error('Erro ao enviar e-mail de recuperação de senha');
  }
};

export const useSendPasswordRecoveryEmail = () => {
  return useMutation({mutationFn: sendPasswordRecoveryEmail});
};

// VALIDA CÓDIGO DE RECUPERAÇÃO DE SENHA
export interface ValidatePasswordResetCodeParams {
  email: string;
  codigo: string;
}

const validatePasswordResetCode = async ({
  email,
  codigo,
}: ValidatePasswordResetCodeParams) => {
  const {data} = await httpRequest.post(
    `/recuperar_senha/validar/${codigo}/${email}`,
  );
  return data;
};

export const useValidatePasswordResetCode = () => {
  return useMutation({mutationFn: validatePasswordResetCode});
};

// REDEFINE SENHA
const resetPassword = async (passwordResetData: PasswordReset) => {
  const {data} = await httpRequest.post(
    '/recuperar_senha/recuperar',
    passwordResetData,
  );
  return data;
};

export const useResetPassword = () => {
  return useMutation({mutationFn: resetPassword});
};
