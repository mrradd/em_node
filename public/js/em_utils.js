const EMUtils = () => {
  const em_compilePromptAnswerText = ({dateTimeStr, prompt, response}) => {
    return (`**${dateTimeStr}**\n\n`+
      `**Prompt**:\n\n${prompt}\n\n`+
      `**Response**:\n\n${response}`);
  }

  const exportObj = {
    em_compilePromptAnswerText: em_compilePromptAnswerText
  };

  return exportObj;
};

const em_utils = EMUtils();