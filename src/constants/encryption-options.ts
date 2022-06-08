export const encryptionOptions = {
  key: process.env.CRYPTO_PRIVATE_KEY,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
};
