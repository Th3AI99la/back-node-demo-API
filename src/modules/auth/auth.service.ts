import { AuthDTO } from './dtos/auth-insert.dto';
import { getUserByEmail } from '@modules/user/user.service';
import { validadePassword } from 'src/utils/password';
import { NotFoundException } from '@exceptions/not-found-exception';
import { AuthModel } from './auth.model';
import { generateToken } from 'src/utils/auth';

export const validadeAuth = async (authDto: AuthDTO): Promise<AuthModel> => {
  const user = await getUserByEmail(authDto.email);

  const isValidPassword = await validadePassword(authDto.password, user.password);

  if (!isValidPassword) {
    throw new NotFoundException('User');
  }

  return new AuthModel(generateToken(user), user);
};
