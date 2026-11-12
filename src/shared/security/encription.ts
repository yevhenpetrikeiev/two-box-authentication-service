import * as argon2 from 'argon2';

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, plainPassword);
};

export { hashPassword, comparePasswords };
