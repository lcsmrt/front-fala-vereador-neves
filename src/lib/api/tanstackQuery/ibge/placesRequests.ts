import {useQuery} from '@tanstack/react-query';
import ibgeHttpRequest from '../../axios/ibgeHttpRequest';

// DEFINI O TIPO AQUI DENTRO POIS NÃO SERÁ USADO EM NENHUM OUTRO LUGAR
export interface State {
  id: number;
  nome: string;
  sigla: string;
}

const getStates = async () => {
  const response = await ibgeHttpRequest.get('/estados?orderBy=nome');
  return response.data;
};

export const useGetStates = () => {
  return useQuery<State[], Error>({
    queryKey: ['states'],
    queryFn: getStates,
  });
};

export interface City {
  id: number;
  nome: string;
}

const getCities = async () => {
  const response = await ibgeHttpRequest.get(`/municipios`);
  return response.data || [];
};

export const useGetCities = () => {
  return useQuery<City[], Error>({
    queryKey: ['cities'],
    queryFn: getCities,
  });
};
