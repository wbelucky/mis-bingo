export const validateEnv = (envName: string) => {
  const env = process.env[envName];
  if (!env) {
    console.error(`env ${envName} does not exist`);
    process.exit(1);
  }
  return env;
};
