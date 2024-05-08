import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {
  Solicitation,
  SolicitationKpi,
  SolicitationType,
} from '../../types/solicitation/solicitation';
import {Alderman} from '../../types/accessControl/alderman';

// BUSCA TODAS AS SOLICITAÇÕES DE UM USUÁRIO OU VEREADOR
interface GetSolicitationParams {
  id: string;
  tipoUsuario: 'usuario' | 'vereador';
}

const getSolicitations = async ({id, tipoUsuario}: GetSolicitationParams) => {
  const {data} = await httpRequest.get(`/solicitacoes/${tipoUsuario}/${id}`);
  return data.content || [];
};

export const useGetSolicitations = ({
  id,
  tipoUsuario,
}: GetSolicitationParams) => {
  return useQuery<Solicitation[], Error>({
    queryKey: ['solicitations'],
    queryFn: () => getSolicitations({id, tipoUsuario}),
  });
};

export const useActionableGetSolicitations = () => {
  return useMutation<Solicitation[], Error, GetSolicitationKpisParams>({
    mutationFn: getSolicitations,
  });
};

// BUSCA OS KPIS REFERENTES ÀS SOLICITAÇÕES DE UM USUÁRIO OU VEREADOR
interface GetSolicitationKpisParams {
  id: string;
  tipoUsuario: 'usuario' | 'vereador';
}

const getSolicitationKpis = async ({
  id,
  tipoUsuario,
}: GetSolicitationKpisParams) => {
  const response = await httpRequest.get(`/graficos/${tipoUsuario}/${id}`);
  return response.data;
};

// BUSCA OS KPIS REFERENTES ÀS SOLICITAÇÕES DE UM USUÁRIO OU VEREADOR
// PORÉM DE FORMA CONTROLADA, NÃO AUTOMÁTICA
export const useGetSolicitationKpis = ({
  id,
  tipoUsuario,
}: GetSolicitationKpisParams) => {
  return useQuery<SolicitationKpi, Error>({
    queryKey: ['solicitationKpis'],
    queryFn: () => getSolicitationKpis({id, tipoUsuario}),
  });
};

export const useActionableGetSolicitationKpis = () => {
  return useMutation<SolicitationKpi, Error, GetSolicitationKpisParams>({
    mutationFn: getSolicitationKpis,
  });
};

// ABRE UMA NOVA SOLICITAÇÃO
interface OpenSolicitationParams {
  assunto: string;
  conteudo: string;
  topico: SolicitationType;
  anonimo: boolean;
  vereador: Alderman | null;
}

const openSolicitation = async (solicitation: OpenSolicitationParams) => {
  const {data} = await httpRequest.post('/solicitacoes', solicitation);
  return data;
};

export const useOpenSolicitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: openSolicitation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['solicitations']});
      queryClient.invalidateQueries({queryKey: ['solicitationKpis']});
    },
  });
};

// FINALIZA UMA SOLICITAÇÃO
const finishSolicitation = async (solicitationId: number) => {
  const {data} = await httpRequest.put(
    `/solicitacoes/finalizar/${solicitationId}`,
  );
  return data;
};

export const useFinishSolicitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: finishSolicitation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['solicitations']});
      queryClient.invalidateQueries({queryKey: ['solicitationKpis']});
      queryClient.invalidateQueries({queryKey: ['chatMessages']});
    },
  });
};

// REABRE UMA SOLICITAÇÃO
const reopenSolicitation = async (solicitationId: number) => {
  const {data} = await httpRequest.put(
    `/solicitacoes/reabrir/${solicitationId}`,
  );
  return data;
};

export const useReopenSolicitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reopenSolicitation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['solicitations']});
      queryClient.invalidateQueries({queryKey: ['solicitationKpis']});
      queryClient.invalidateQueries({queryKey: ['chatMessages']});
    },
  });
};
