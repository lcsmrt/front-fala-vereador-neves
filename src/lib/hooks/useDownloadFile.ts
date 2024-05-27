import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {useToastContext} from '../contexts/useToastContext';
import {requestPermissions} from '../utils/permissions';
import {sanitizeFileName} from '../utils/formatters';

const useDownloadFile = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const {showToast} = useToastContext();

  const isValidBase64 = (base64: string) => {
    const regex =
      /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return regex.test(base64);
  };

  const generateUniqueFileName = (fileName: string) => {
    const timestamp = new Date().getTime();
    const sanitizedFileName = sanitizeFileName(fileName);
    const extension = fileName.split('.').pop();
    return `${sanitizedFileName}-${timestamp}.${extension}`;
  };

  const saveBase64File = async (base64: string, fileName: string) => {
    setIsDownloading(true);
    setIsDownloaded(false);
    setIsError(false);

    if (!isValidBase64(base64)) {
      showToast('Arquivo inválido', 'error');
      setIsError(true);
      setIsDownloading(false);
      return;
    }

    const uniqueFileName = generateUniqueFileName(fileName);
    const filePath = `${RNFS.DownloadDirectoryPath}/${uniqueFileName}`;

    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        showToast(
          'O aplicativo não tem permissão para salvar arquivos',
          'error',
        );
        setIsError(true);
        setIsDownloading(false);
        return;
      }

      const chunkSize = 1024 * 1024; // CHUNKS DE 1MB
      for (let i = 0; i < base64.length; i += chunkSize) {
        const chunk = base64.slice(i, i + chunkSize);
        await RNFS.appendFile(filePath, chunk, 'base64');
      }

      setIsDownloaded(true);
      showToast('Arquivo salvo com sucesso', 'success');
    } catch (error) {
      console.error(error);
      showToast('Erro ao salvar arquivo', 'error');
      setIsError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  return {saveBase64File, isDownloading, isDownloaded, isError};
};

export default useDownloadFile;
