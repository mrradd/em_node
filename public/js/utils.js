class EMUtils {
  /**
   * 
   * @param dateStr `from ChatResponse`
   * @param prompt `from ChatResponse`
   * @param response `from ChatResponse`
   * @returns 
   */
  static compilePromptAnswerText ({ dateStr, prompt, response }) {
    return (`**${dateStr}**\n\n`+
      `**Prompt**:\n\n${prompt}\n\n`+
      `**Response**:\n\n${response}`);
  }
};