import {useMutation, useQuery} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {Document} from '../../types/system/document';

// BUSCA IMAGEM DE PERFIL POR ID
const getAttachment = async (attachmentId?: string | number) => {
  if (!attachmentId) return;

  const {data} = await httpRequest.get(`/anexos/id/${attachmentId}`);
  return data || '';
};

export const useGetAttachment = (attachmentId?: string | number) => {
  return useQuery<Document, Error>({
    queryKey: ['profileImage'],
    queryFn: () => getAttachment(attachmentId),
  });
};

export const useActionableGetAttachment = () => {
  return useMutation<Document, Error, string | number>({
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
