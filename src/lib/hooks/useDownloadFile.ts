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

  const getFileTypeDirectory = (fileType: string) => {
    switch (fileType) {
      case 'image/jpeg':
      case 'image/png':
        return 'Images';
      case 'application/pdf':
        return 'PDFs';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        return 'Spreadsheets';
      default:
        return 'Documents';
    }
  };

  const saveBase64File = async (
    base64: string,
    fileName: string,
    fileType: string,
  ) => {
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
    const parentDirectory = `${RNFS.ExternalStorageDirectoryPath}/FalaVereador/${getFileTypeDirectory(fileType)}`;
    const filePath = `${parentDirectory}/${uniqueFileName}`;
    const fallbackDirectory = `${RNFS.DownloadDirectoryPath}/${uniqueFileName}`;
    let finalFilePath = filePath;

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

      if (!(await RNFS.exists(parentDirectory))) {
        console.log('Diretório não existe:', parentDirectory);
        try {
          await RNFS.mkdir(parentDirectory, {
            NSURLIsExcludedFromBackupKey: true,
          });
          console.log('Diretório criado com sucesso:', parentDirectory);
        } catch (err) {
          console.error('Erro ao criar diretório:', err);
          finalFilePath = fallbackDirectory;
        }
      }

      const chunkSize = 1024 * 1024;
      for (let i = 0; i < base64.length; i += chunkSize) {
        const chunk = base64.slice(i, i + chunkSize);
        await RNFS.appendFile(finalFilePath, chunk, 'base64');
      }

      await RNFS.scanFile(finalFilePath)
        .then(() => {
          console.log('Arquivo escaneado com sucesso:', finalFilePath);
        })
        .catch(error => {
          console.error('Erro ao escanear arquivo:', error);
        });

      const fileExists = await RNFS.exists(finalFilePath);
      if (fileExists) {
        console.log('Arquivo salvo com sucesso:', finalFilePath);
      } else {
        console.error('O arquivo não existe:', finalFilePath);
        showToast('Erro ao salvar arquivo', 'error');
        setIsError(true);
        setIsDownloading(false);
        return;
      }

      try {
        await FileViewer.open(finalFilePath, {showOpenWithDialog: true});
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
