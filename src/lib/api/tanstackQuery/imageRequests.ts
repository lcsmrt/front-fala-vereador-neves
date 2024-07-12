import {useMutation, useQuery} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {Document} from '../../types/system/document';

// BUSCA IMAGEM POR ID
const getAttachmentById = async (attachmentId?: string | number) => {
  if (!attachmentId) return;

  const {data} = await httpRequest.get(`/anexos/id/${attachmentId}`);
  return data || '';
};

export const useGetAttachmentById = (attachmentId?: string | number) => {
  return useQuery<Document, Error>({
    queryKey: ['attachmentById'],
    queryFn: () => getAttachmentById(attachmentId),
  });
};

export const useActionableGetAttachmentById = () => {
  return useMutation<Document, Error, string | number>({
    mutationFn: getAttachmentById,
  });
};

// BUSCA IMAGEM POR NOME
const getAttachmentByName = async (pictureName?: string) => {
  if (!pictureName) return;

  const {data} = await httpRequest.get(`/anexos/nome/${pictureName}`);
  return data || '';
};

export const useGetAttachmentByName = (pictureName?: string) => {
  return useQuery<Document, Error>({
    queryKey: ['attachmentByName'],
    queryFn: () => getAttachmentByName(pictureName),
  });
};

export const useActionableGetAttachmentByName = () => {
  return useMutation<Document, Error, string>({
    mutationFn: getAttachmentByName,
  });
};
