import RNFetchBlob from 'rn-fetch-blob';

export const handleDownload = async (fileUrl: string, fileName: string) => {
  let dirs = RNFetchBlob.fs.dirs;
  let path = `${dirs.DownloadDir}/${fileName}`;

  try {
    const res = await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        description: 'File downloaded.',
      },
    }).fetch('GET', fileUrl);

    console.log('The file is saved to:', res.path());
  } catch (error) {
    console.error('Download error:', error);
  }
};

export const saveBase64File = async (base64: string, fileName: string, fileType: string) => {
  const dirs = RNFetchBlob.fs.dirs;
  const filePath = `${dirs.DownloadDir}/${fileName}`;
  await RNFetchBlob.fs.writeFile(filePath, base64, 'base64');
  console.log(`File saved to ${filePath}`);
};