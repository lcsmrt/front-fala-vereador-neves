import {useEffect} from 'react';
import {useActionableGetSolicitations} from '../../../lib/api/tanstackQuery/solicitationRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {User} from '../../../lib/types/accessControl/user';

const useUserSolicitations = (user: User | null, shouldRefetch?: number) => {
  const {
    mutate: getSolicitations,
    isPending: isSolicitationsLoading,
    data: solicitations,
  } = useActionableGetSolicitations();
  const {setIsLoading} = useLoadingContext();

  const getUserSolicitations = () => {
    if (user && user.id) {
      if (Boolean(user.vereador)) {
        getSolicitations({
          id: String(user.vereador?.pk),
          tipoUsuario: 'vereador',
        });
      } else {
        getSolicitations({
          id: String(user.id),
          tipoUsuario: 'usuario',
        });
      }
    }
  };

  useEffect(() => {
    getUserSolicitations();
  }, [user, shouldRefetch]);

  useEffect(() => {
    setIsLoading(isSolicitationsLoading);
  }, [isSolicitationsLoading]);

  return {isSolicitationsLoading, getUserSolicitations, solicitations};
};

export default useUserSolicitations;
