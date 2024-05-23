import {useEffect} from 'react';
import {useActionableGetSolicitations} from '../../../lib/api/tanstackQuery/solicitationRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {User} from '../../../lib/types/accessControl/user';

const useUserSolicitations = (user: User | null, shouldRefetch?: number, status?: number | string) => {
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
          idStatus: status,
        });
      } else {
        console.log('user.id', user.id);
        console.log('status', status);
        getSolicitations({
          id: String(user.id),
          tipoUsuario: 'usuario',
          idStatus: status,
        });
      }
    }
  };

  useEffect(() => {
    getUserSolicitations();
  }, [user, shouldRefetch, status]);

  useEffect(() => {
    setIsLoading(isSolicitationsLoading);
  }, [isSolicitationsLoading]);

  return {isSolicitationsLoading, getUserSolicitations, solicitations};
};

export default useUserSolicitations;
