import { ANTHROPIC, OPEN_AI } from "../utils/RadConsts";
import { AiData } from "./AiData";
import { findAiCompany } from "./AiModels";
import { AnthropicProvider } from "./AnthropicProvider";
import { ChatParams } from "./ChatParams";
import { OpenAiProvider } from "./OpenAiProvider";

export interface AiProvider {
  chat(chatParams: ChatParams): Promise<AiData>;
}

export const aiProviderFactory = (modelName: string): AiProvider => {
  const companyName = findAiCompany(modelName)

  if (companyName === OPEN_AI) {
    return new OpenAiProvider();
  }
  else if (companyName === ANTHROPIC) {
    return new AnthropicProvider();
  }
  else {
    throw new Error(`Unable to create an AiProvider for model: ${modelName}`);
  }
}