import {createContext, useContext, useState} from 'react';
import AppDrawer from '../../components/drawer/appDrawer';

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
      {isDrawerVisible && <AppDrawer />}
    </DrawerContext.Provider>
  );
};

export {useDrawerContext, DrawerContextProvider};
