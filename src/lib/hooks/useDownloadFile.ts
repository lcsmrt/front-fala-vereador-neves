import {useState} from 'react';
import RNFS from 'react-native-fs';
import {useToastContext} from '../contexts/useToastContext';
import {requestPermissions} from '../utils/permissions';
import {sanitizeFileName} from '../utils/formatters';
import FileViewer from 'react-native-file-viewer';

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
    return `${timestamp}_${sanitizedFileName}`;
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
    console.log('Salvando arquivo em:', filePath);

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

      const chunkSize = 1024 * 1024;
      for (let i = 0; i < base64.length; i += chunkSize) {
        const chunk = base64.slice(i, i + chunkSize);
        await RNFS.appendFile(filePath, chunk, 'base64');
      }

      await RNFS.scanFile(filePath)
        .then(() => {
          console.log('Arquivo escaneado com sucesso:', filePath);
        })
        .catch(error => {
          console.error('Erro ao escanear arquivo:', error);
        });

      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        console.log('Arquivo salvo com sucesso:', filePath);
      } else {
        console.error('O arquivo não existe:', filePath);
        showToast('Erro ao salvar arquivo', 'error');
        setIsError(true);
        setIsDownloading(false);
        return;
      }

      try {
        await FileViewer.open(filePath, {showOpenWithDialog: true});
        setIsDownloaded(true);
      } catch (openError) {
        console.error('Error opening file:', openError);
        showToast(
          'Erro ao abrir arquivo. Verifique se há um app instalado para abrir este tipo de arquivo.',
          'error',
        );
        setIsError(true);
      }
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