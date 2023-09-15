import { UserModel } from '@modules/user/user.model';
import { AuthDTO } from './dtos/auth-insert.dto';
import { getUserByEmail } from '@modules/user/user.service';
import { validadePassword } from 'src/utils/password';
import { NotFoundException } from '@exceptions/not-found-exception';

export const validadeAuth = async (authDto: AuthDTO): Promise<UserModel> => {
  const user = await getUserByEmail(authDto.email);

  const isValidPassword = await validadePassword(authDto.password, user.password);

  if (!isValidPassword) {
    throw new NotFoundException('User');
  }

  return user;
};
