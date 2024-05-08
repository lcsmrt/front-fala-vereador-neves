import {useEffect} from 'react';
import {useActionableGetSolicitationKpis} from '../../../lib/api/tanstackQuery/solicitationRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {User} from '../../../lib/types/accessControl/user';

const useUserSolicitationsKpis = (user: User | null) => {
  const {
    mutate: getSolicitationsKpis,
    isPending: isSolicitationsKpisLoading,
    data: solicitationsKpis,
  } = useActionableGetSolicitationKpis();
  const {setIsLoading} = useLoadingContext();

  const getUserSolicitationsKpis = () => {
    if (user && user.id) {
      if (Boolean(user.vereador)) {
        getSolicitationsKpis({
          id: String(user.vereador?.pk),
          tipoUsuario: 'vereador',
        });
      } else {
        getSolicitationsKpis({
          id: String(user.id),
          tipoUsuario: 'usuario',
        });
      }
    }
  };

  useEffect(() => {
    getUserSolicitationsKpis();
  }, [user]);

  useEffect(() => {
    setIsLoading(isSolicitationsKpisLoading);
  }, [isSolicitationsKpisLoading]);

  return {
    isSolicitationsKpisLoading,
    getUserSolicitationsKpis,
    solicitationsKpis,
  };
};

export default useUserSolicitationsKpis;
