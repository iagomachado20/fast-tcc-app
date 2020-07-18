export enum TypeUser {
  Client = 1,
  Establishment = 0
}

export interface User {
  ativo: boolean;
  email: string;
  endereco: string;
  foto: string;
  horarioFuncionamento: string;
  localizacao: any;
  marcaVeiculo: string;
  nome: string;
  numero: number;
  observacao: string;
  perfil: TypeUser;
  placaVeiculo: string;
  rating: number;
  telefone: string;
  vagas: number;
  valorhora: number;
}

export interface Establishment extends User {
  distance: string;
}
