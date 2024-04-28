import {useEffect} from 'react';
import {useActionableGetSolicitations} from '../../../lib/api/tanstackQuery/solicitationRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {User} from '../../../lib/types/user';

const useUserSolicitations = (user: User | null) => {
  const {
    mutate: getSolicitations,
    isPending: isSolicitationsLoading,
    data: solicitations,
  } = useActionableGetSolicitations();
  const {setIsLoading} = useLoadingContext();

  const getUserSolicitations = () => {
    if (user && user.id)
      getSolicitations({
        id: user.id,
        tipoUsuario: user.vereador ? 'vereador' : 'usuario',
      });
  };

  useEffect(() => {
    getUserSolicitations();
  }, [user]);

  useEffect(() => {
    setIsLoading(isSolicitationsLoading);
  }, [isSolicitationsLoading]);

  return {isSolicitationsLoading, getUserSolicitations, solicitations};
};

export default useUserSolicitations;
