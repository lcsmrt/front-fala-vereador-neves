import {useQuery} from '@tanstack/react-query';
import {Alderman} from '../../types/alderman';
import httpRequest from '../axios/httpRequest';

const getAldermans = async () => {
  const response = await httpRequest.get('/pessoa');
  return response.data || [];
};

export const useGetAldermans = () => {
  return useQuery<Alderman[], Error>({
    queryKey: ['aldermans'],
    queryFn: getAldermans,
  });
};
