import dotenv from "dotenv";

dotenv.config();
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY ?? "";
export const ANTHROPIC_API_KEY: string = process.env.ANTHROPIC_API_KEY ?? "";
export const DATABASE_NAME: string = process.env.DATABASE_NAME ?? "";
export const HOST: string = process.env.HOST ?? "localhost";
export const PORT: number = Number(process.env.PORT) ?? 3000;

export function validateSettings() {
  console.log(`OPENAI_API_KEY:\t${OPENAI_API_KEY ? 'Is set.' : 'Is not set.'}`);
  console.log(`ANTHROPIC_API_KEY:\t${ANTHROPIC_API_KEY ? 'Is set.' : 'Is not set.'}`);
  console.log(`DATABASE_NAME:\t${DATABASE_NAME}`);
  console.log(`HOST:\t${HOST}`);
  console.log(`PORT:\t${PORT}`);

  let missingNeededVals = false;

  if (!DATABASE_NAME) {
    console.error("!!! MISSING DATABASE_NAME !!!");
    missingNeededVals = true;
  }

  if (!OPENAI_API_KEY && !ANTHROPIC_API_KEY) {
    console.error("!!! MISSING AI API keys !!!");
    missingNeededVals = true;
  }

  if (missingNeededVals) {
    console.error("!!! MISSING VALUES - exiting !!!");
    missingNeededVals = true;
    process.exit(1);
  }
}