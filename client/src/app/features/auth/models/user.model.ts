export interface IUserInfo {
  type: string;
  data: {
    id: number;
    nome: string;
    telefone: string;
    login: string;
    cpnj?: string;
    endereco?: string;
  };
}
