import * as argon2 from 'argon2';

const hash = async (string: string): Promise<string> => {
  const hashedPassword = await argon2.hash(string);
  return hashedPassword;
};

const compareHashes = async (
  plainString: string,
  hashedString: string,
): Promise<boolean> => {
  return await argon2.verify(plainString, hashedString);
};

export { hash, compareHashes };
