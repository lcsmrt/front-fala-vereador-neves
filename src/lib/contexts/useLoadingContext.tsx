import {createContext, useContext, useState} from 'react';
import Loading from '../../components/loading/loading';

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (_: boolean) => {},
});

const useLoadingContext = () => useContext(LoadingContext);

const LoadingContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{isLoading, setIsLoading}}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
};

export {useLoadingContext, LoadingContextProvider};
