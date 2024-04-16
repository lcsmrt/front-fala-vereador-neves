import {createContext, useContext, useState} from 'react';

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
    </LoadingContext.Provider>
  );
};

export {useLoadingContext, LoadingContextProvider};
