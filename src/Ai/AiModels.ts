import { ANTHROPIC, OPEN_AI } from "../utils/RadConsts";


export interface AiModel {
  name: string,
  company: string,
}

export const aiModels = [
  { name: "gpt-5.4-2026-03-05", company: OPEN_AI },
  { name: "gpt-5.4-mini-2026-03-17", company: OPEN_AI },
  { name: "gpt-5.4-nano-2026-03-17", company: OPEN_AI },
  { name: "gpt-5.4-pro-2026-03-05", company: OPEN_AI },
  { name: "gpt-5.5-2026-04-23", company: OPEN_AI },
  { name: "gpt-5.5-pro-2026-04-23", company: OPEN_AI },
  { name: "gpt-5.6-sol", company: OPEN_AI },
  { name: "gpt-5.6-terra", company: OPEN_AI },
  { name: "gpt-5.6-luna", company: OPEN_AI },
  { name: "claude-haiku-4-5", company: ANTHROPIC },
  { name: "claude-sonnet-5", company: ANTHROPIC },
  { name: "claude-opus-4-8", company: ANTHROPIC },
  { name: "claude-fable-5", company: ANTHROPIC },
]

/**
 * Searches the list of AI models to find a match by name, then returns the related company.
 * @param modelName - `string` - Name of the model to find the company for.
 * @returns Model's company name.
 * @throws error if no model found.
 */
export const findAiCompany = (modelName: string): string => {
  const model: AiModel | undefined = aiModels.find((model) => {
    return model.name === modelName;
  })

  if (!model) {
    throw new Error("No valid model found.");
  }

  return model.company;
}