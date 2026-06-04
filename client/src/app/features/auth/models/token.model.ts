import { ERoles } from '../../../shared/models/roles';

export interface ITokenResponse {
  type: string;
  token: ERoles;
}
