import { UserModel } from '@modules/user/user.model';
import { AuthDTO } from './dtos/auth-insert.dto';
import { getUserByEmail } from '@modules/user/user.service';

export const validadeAuth = async (authDto: AuthDTO): Promise<UserModel> => {
  const user = getUserByEmail(authDto.email);

  return user;
};
