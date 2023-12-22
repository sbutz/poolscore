export function isDevelopmentEnv() {
  return process.env.NODE_ENV === 'development';
}
export function isTestEnv() {
  return process.env.NODE_ENV === 'test';
}
