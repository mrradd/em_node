class ChatResponse {
  constructor({ dateStr, prompt, response }) {
    this.dateStr = dateStr;
    this.prompt = prompt;
    this.response = response;
  }
}

class EMUtils {
  static compilePromptAnswerText ({ dateStr, prompt, response }) {
    return (`**${dateStr}**\n\n`+
      `**Prompt**:\n\n${prompt}\n\n`+
      `**Response**:\n\n${response}`);
  }
};