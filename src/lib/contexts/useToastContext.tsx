import {createContext, useContext, useState} from 'react';
import Toast from '../../components/toast/toast';

const ToastContext = createContext({
  showToast: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
  ) => {},
  hideToast: () => {},
});

const useToastContext = () => useContext(ToastContext);

const ToastContextProvider = ({children}: {children: React.ReactNode}) => {
  const [toastInfo, setToastInfo] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({message: '', type: 'success'});

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
  ) => setToastInfo({message, type});
  const hideToast = () => setToastInfo({message: '', type: 'success'});

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      {toastInfo.message && (
        <Toast
          message={toastInfo.message}
          type={toastInfo.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export {useToastContext, ToastContextProvider};
