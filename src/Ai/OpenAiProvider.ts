import { EasyInputMessage, ResponseInput, ResponseInputItem } from "openai/resources/responses/responses";
import { openaiClient } from "../Server";
import { AiData, openAiResponseToAiData } from "./AiData";
import { AiProvider } from "./AiProvider";
import { ChatParams } from "./ChatParams";
import { ReasoningEffort } from "openai/resources.js";
import { DEFAULT_REASONING_MODE } from "../EMConfig";

export class OpenAiProvider implements AiProvider {
  /**
   * Send a chat request to OpenAI.
   * @param params - `ChatParams` - Paremeters for sending a chat message.
   * @returns AiData object with stats from the response.
   */
  async chat(chatParams: ChatParams): Promise<AiData> {
    const response = await openaiClient.responses.create({
      model: chatParams.model,
      input: chatParams.inputs as ResponseInput,
      instructions: chatParams.systemLevelInstructions,
      max_output_tokens: chatParams.maxOutputTokens,
      reasoning: { effort: OpenAiProvider.convertDefaultReasoningStrToReasoningEffort(chatParams.reasoning!) },
    });

    return openAiResponseToAiData(response);
  }

  static convertDefaultReasoningStrToReasoningEffort(reasongingStr: string): ReasoningEffort {
    let effort: ReasoningEffort = "none"
    
    switch(reasongingStr){
      case "none": effort = "none"
        break;
      case "low": effort = "low"
        break;
      case "medium": effort = "medium"
        break;
      case "high": effort = "high"
        break;
      case "xhigh": effort = "xhigh"
        break;
      case "max": effort = "max"
        break;
    }

    return effort
  }
}