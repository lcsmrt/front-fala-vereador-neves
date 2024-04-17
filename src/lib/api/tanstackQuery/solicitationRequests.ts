import {useMutation, useQuery} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {Solicitation, SolicitationKpi} from '../../types/solicitation';

interface GetSolicitationParams {
  id: string;
  tipoUsuario: 'usuario' | 'vereador';
}

const getSolicitations = async ({id, tipoUsuario}: GetSolicitationParams) => {
  const response = await httpRequest.get(`/solicitacoes/${tipoUsuario}/${id}`);
  return response.data.content || [];
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

interface GetSolicitationKpisParams {
  id: string;
  tipoUsuario: 'usuario' | 'vereador';
}

const getSolicitationKpis = async ({
  id,
  tipoUsuario,
}: GetSolicitationKpisParams) => {
  const response = await httpRequest.get(`/graficos/${tipoUsuario}/${id}`);
  return response.data
};

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
