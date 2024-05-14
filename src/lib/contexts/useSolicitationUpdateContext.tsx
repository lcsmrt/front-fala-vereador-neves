import {Dispatch, SetStateAction, createContext, useContext, useState} from 'react';

const SolicitationUpdateContext = createContext({
  solicitationUpdatesCount: 0,
  setSolicitationUpdatesCount: (() => {}) as Dispatch<SetStateAction<number>>,
});

const useSolicitationUpdateContext = () =>
  useContext(SolicitationUpdateContext);

const SolicitationUpdateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [solicitationUpdatesCount, setSolicitationUpdatesCount] = useState(0);

  return (
    <SolicitationUpdateContext.Provider
      value={{solicitationUpdatesCount, setSolicitationUpdatesCount}}>
      {children}
    </SolicitationUpdateContext.Provider>
  );
};

export {useSolicitationUpdateContext, SolicitationUpdateContextProvider};
