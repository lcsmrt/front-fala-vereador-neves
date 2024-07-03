import {useMutation, useQuery} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {Document} from '../../types/system/document';

// BUSCA IMAGEM DE PERFIL POR ID
const getAttachment = async (imagePath?: string) => {
  if (!imagePath) return;

  const {data} = await httpRequest.get(`/anexos/nome/${imagePath}`);
  return data || '';
};

export const useGetAttachment = (imagePath?: string) => {
  return useQuery<Document, Error>({
    queryKey: ['profileImage'],
    queryFn: () => getAttachment(imagePath),
  });
};

export const useActionableGetAttachment = () => {
  return useMutation<Document, Error, string>({
    mutationFn: getAttachment,
  });
};

// BUSCA IMAGEM DE VEREADOR POR NOME
const getAldermanImage = async (pictureName?: string) => {
  if (!pictureName) return;

  const {data} = await httpRequest.get(`/anexos/nome/${pictureName}`);
  return data || '';
};

export const useGetAldermanImage = (pictureName?: string) => {
  return useQuery<Document, Error>({
    queryKey: ['aldermanProfileImage'],
    queryFn: () => getAldermanImage(pictureName),
  });
};

export const useActionableGetAldermanImage = () => {
  return useMutation<Document, Error, string>({
    mutationFn: getAldermanImage,
  });
};
