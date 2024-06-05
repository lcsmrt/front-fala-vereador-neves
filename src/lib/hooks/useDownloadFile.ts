import {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {useToastContext} from '../contexts/useToastContext';

const useDownloadFile = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const {showToast} = useToastContext();

  const saveBase64File = async (base64: string, fileName: string) => {
    setIsDownloading(true);
    setIsDownloaded(false);
    setIsError(false);

    const dirs = RNFetchBlob.fs.dirs;
    const filePath = `${dirs.DownloadDir}/${fileName}`;

    try {
      const isDir = await RNFetchBlob.fs.isDir(dirs.DownloadDir);

      if (!isDir) {
        await RNFetchBlob.fs.mkdir(dirs.DownloadDir);
      }

      await RNFetchBlob.fs.writeFile(filePath, base64, 'base64');
      setIsDownloaded(true);
      showToast('Arquivo salvo com sucesso', 'success');
    } catch (error) {
      showToast('Erro ao salvar o arquivo', 'error');
      setIsError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  return {saveBase64File, isDownloading, isDownloaded, isError};
};

export default useDownloadFile;
