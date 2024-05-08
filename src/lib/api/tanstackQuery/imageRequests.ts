import {useQuery} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {Document} from '../../types/system/document';

// BUSCA IMAGEM DE PERFIL POR ID
const getProfileImage = async (id?: string | number) => {
  if (!id) return;

  const {data} = await httpRequest.get(`/anexos/id/${id}`);
  return data || '';
};

export const useGetProfileImage = (id?: string | number) => {
  return useQuery<Document, Error>({
    queryKey: ['profileImage'],
    queryFn: () => getProfileImage(id),
  });
};

const getAldermanImage = async (pictureName?: string) => {
  if (!pictureName) return;

  const {data} = await httpRequest.get(`/anexos/nome/${pictureName}`);
  return data || '';
};

export const useGetAldermanImage = async (pictureName?: string) => {
  return useQuery<Document, Error>({
    queryKey: ['aldermanProfileImage'],
    queryFn: () => getAldermanImage(pictureName),
  });
};
