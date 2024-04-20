import {createContext, useContext, useState} from 'react';
import Drawer from '../../components/drawer/drawer';

const DrawerContext = createContext({
  isDrawerVisible: false,
  setIsDrawerVisible: (_: boolean) => {},
});

const useDrawerContext = () => useContext(DrawerContext);

const DrawerContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <DrawerContext.Provider value={{isDrawerVisible, setIsDrawerVisible}}>
      {children}
      {isDrawerVisible && <Drawer />}
    </DrawerContext.Provider>
  );
};

export {useDrawerContext, DrawerContextProvider};
