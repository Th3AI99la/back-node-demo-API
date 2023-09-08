import { PrismaClient } from '@prisma/client';
import { UserModel } from './user.model';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { BadRequestException } from '@exceptions/bad-request-exception';

const prisma = new PrismaClient();

// METODO GET - buscar usuario
export const getUsers = async (): Promise<UserModel[]> => {
  const users = await prisma.user.findMany();

  if (users?.length === 0) {
    throw new NotFoundException('User');
  }

  return prisma.user.findMany();
};

// METODO POST - criar usuario
export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  // VALIDADE DE E-MAIL
  const userEmail = await getUserByEmail(body.email).catch(() => undefined);

  if (userEmail) {
    throw new BadRequestException('Esse e-mail já existe no BD');
  }
  // VALIDADE DE CPF
  const userCpf = await getUserByCpf(body.cpf).catch(() => undefined);

  if (userCpf) {
    throw new BadRequestException('Esse CPF já existe no BD');
  }

  return prisma.user.create({
    data: body,
  });
};

// METODO DELETE - deletar usuario (ChatGPT)
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    // Se ocorrer um erro durante a exclusão, você pode lançar uma exceção ou tratá-lo de acordo com suas necessidades
    throw new Error('Não foi possível excluir o usuário.');
  }
};

// METODO PUT - alterar usuario (ChatGPT)
export const updateUser = async (
  userId: number,
  updatedUser: UserInsertDTO,
): Promise<UserModel | null> => {
  try {
    // Verifique se o usuário existe
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      throw new NotFoundException('User');
    }

    // Atualize as informações do usuário
    const updatedUserInfo = await prisma.user.update({
      where: { id: userId },
      data: updatedUser,
    });

    return updatedUserInfo;
  } catch (error) {
    throw new Error('Não foi possível atualizar as informações do usuário.');
  }
};

// Tratando os erros ao criar um usuário (E-MAIL)

export const getUserByEmail = async (email: string): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  // Se eu não encontrar o user, subir a exeção
  if (!user) {
    throw new NotFoundException('User');
  }
  return user;
};

// Tratando os erros ao criar um usuário (CPF)
export const getUserByCpf = async (cpf: string): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      cpf,
    },
  });
  // Se eu não encontrar o user, subir a exeção
  if (!user) {
    throw new NotFoundException('User');
  }
  return user;
};
