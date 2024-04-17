import {useMutation} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';

// AUTENTICA USUÁRIO AO REALIZAR LOGIN
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
