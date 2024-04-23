import {useQuery} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {SolicitationType} from '../../types/solicitation';

const getSolicitationTypes = async () => {
  const response = await httpRequest.get('/topico');
  return response.data || [];
};

export const useGetSolicitationTypes = () => {
  return useQuery<SolicitationType[], Error>({
    queryKey: ['solicitationTypes'],
    queryFn: getSolicitationTypes,
  });
};
