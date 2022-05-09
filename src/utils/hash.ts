import bcrypt from 'bcrypt';

import type { Optional } from '../types';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export const generateHash = (password: string): string => bcrypt.hashSync(password, 10);

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(password: Optional<string>, hash: Optional<string>): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}
