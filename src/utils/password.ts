import { hash, compare } from 'bcrypt';

export const createPasswordHashed = async (password: string): Promise<string> => {
  const saltRounds = 10;

  return hash(password, saltRounds);
};

export const validadePassword = async (
  password: string,
  PasswordHashed: string,
): Promise<boolean> => {
  return compare(password, PasswordHashed);
};
