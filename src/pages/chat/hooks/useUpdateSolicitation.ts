import {useEffect, useState} from 'react';
import {useActionableGetSolicitation} from '../../../lib/api/tanstackQuery/solicitationRequests';
import {Solicitation} from '../../../lib/types/solicitation/solicitation';

const useUpdateSolicitation = (solicitationPk?: number) => {
  const [solicitationData, setSolicitationData] = useState<Solicitation>({});

  const {
    mutate: getSolicitation,
    isSuccess: isGetSolicitationSuccess,
    data,
  } = useActionableGetSolicitation();

  const handleUpdateSolicitation = () => {
    if (!solicitationPk) return;

    getSolicitation(solicitationPk);
  };

  useEffect(() => {
    if (isGetSolicitationSuccess && data) {
      setSolicitationData(data);
    }
  }, [isGetSolicitationSuccess, data]);

  useEffect(() => {
    if (solicitationPk) handleUpdateSolicitation();
  }, [solicitationPk]);

  return {solicitationData, isGetSolicitationSuccess, handleUpdateSolicitation};
};

export default useUpdateSolicitation;
