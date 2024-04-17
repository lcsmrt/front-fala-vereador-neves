import {useEffect} from 'react';
import {useActionableGetSolicitationKpis} from '../../../lib/api/tanstackQuery/solicitationRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {User} from '../../../lib/types/user';

const useUserSolicitationsKpis = (user: User | null) => {
  const {
    mutate: getSolicitationsKpis,
    isPending: isSolicitationsKpisLoading,
    data: solicitationsKpis,
  } = useActionableGetSolicitationKpis();
  const {setIsLoading} = useLoadingContext();

  const getUserSolicitationsKpis = () => {
    if (user && user.id)
      getSolicitationsKpis({
        id: user.id,
        tipoUsuario: user.vereador ? 'vereador' : 'usuario',
      });
  };

  useEffect(() => {
    getUserSolicitationsKpis();
  }, [user]);

  useEffect(() => {
    setIsLoading(isSolicitationsKpisLoading);
  }, [isSolicitationsKpisLoading]);

  return {isSolicitationsKpisLoading, getUserSolicitationsKpis, solicitationsKpis};
};

export default useUserSolicitationsKpis;
