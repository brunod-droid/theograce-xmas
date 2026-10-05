
import crypto from 'crypto';

export const STRATEGY_COOKIE = 'xmas_strategy_auth';

export function authToken(password) {
  if (!password) return '';
  return crypto.createHash('sha256').update(`xmas-strategy:${password}`).digest('hex');
}

export function isValidStrategyCookie(value) {
  const password = process.env.STRATEGY_PASSWORD;
  if (!password || !value) return false;
  const expected = authToken(password);
  if (value.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
