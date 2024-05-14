import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

const UserUpdateContext = createContext({
  userUpdatesCount: 0,
  setUserUpdatesCount: (() => {}) as Dispatch<SetStateAction<number>>,
});

const useUserUpdateContext = () => useContext(UserUpdateContext);

const UserUpdateContextProvider = ({children}: {children: React.ReactNode}) => {
  const [userUpdatesCount, setUserUpdatesCount] = useState(0);

  return (
    <UserUpdateContext.Provider value={{userUpdatesCount, setUserUpdatesCount}}>
      {children}
    </UserUpdateContext.Provider>
  );
};

export {useUserUpdateContext, UserUpdateContextProvider};
