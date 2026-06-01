export interface IUserInfo {
  token: string;
  dados: {
    email: string;
    nome: string;
    telefone: string;
    cnpj: string;
    endereco: string;
  };
}
