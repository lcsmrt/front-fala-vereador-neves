import {useMutation} from '@tanstack/react-query';
import viaCepHttpRequest from '../../axios/viaCepHttpRequest';

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const getAddresByCep = async (cep: string) => {
  const response = await viaCepHttpRequest.get(`/${cep}/json`);
  return response.data;
};

export const useGetAddresByCep = () => {
  return useMutation<Address, Error, string>({
    mutationFn: getAddresByCep,
  });
};
