import { ERoles } from '../../../shared/models/roles';

export interface IUserInfo {
  type: ERoles;
  data: {
    id: number;
    nome: string;
    telefone: string;
    login: string;
    cpnj?: string;
    endereco?: string;
  };
}
