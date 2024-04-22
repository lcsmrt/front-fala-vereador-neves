import {createContext, useContext, useState} from 'react';
import AppBottomSheet from '../../components/bottomSheet/appBottomSheet';

const BottomSheetContext = createContext({
  isBottomSheetVisible: false,
  setIsBottomSheetVisible: (_: boolean) => {},
});

const useBottomSheetContext = () => useContext(BottomSheetContext);

const BottomSheetContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <BottomSheetContext.Provider value={{isBottomSheetVisible, setIsBottomSheetVisible}}>
      {children}
      {isBottomSheetVisible && <AppBottomSheet />}
    </BottomSheetContext.Provider>
  );
};

export {useBottomSheetContext, BottomSheetContextProvider};
