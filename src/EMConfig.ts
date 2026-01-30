import dotenv from "dotenv";

dotenv.config();
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY ?? "";
export const DATABASE_NAME: string = process.env.DATABASE_NAME ?? "";
export const HOST: string = process.env.HOST ?? "localhost";
export const PORT: number = Number(process.env.PORT) ?? 3000;
export const MODEL: string = process.env.MODEL ?? "";

export function validateSettings() {
  console.log(`OPENAI_API_KEY:\t${OPENAI_API_KEY ? 'Is set.' : 'Is not set.'}`);
  console.log(`DATABASE_NAME:\t${DATABASE_NAME}`);
  console.log(`HOST:\t${HOST}`);
  console.log(`PORT:\t${PORT}`);
  console.log(`MODEL:\t${MODEL}`);

  if (!OPENAI_API_KEY || !DATABASE_NAME || !MODEL) {
    console.error("!!!MISSING VALUES!!!");
    process.exitCode = 1;
  }
}