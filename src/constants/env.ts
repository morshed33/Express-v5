import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "8000");
export const MONGO_URI = getEnv("MONGO_URI");
