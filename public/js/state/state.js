/**
 * Creates a an object with information about the chat request.
 * @param localeDateStr `string` - Date in locale string form.
 * @param localeTimeStr `string` - Time in locale string form.
 * @param prompt `string` - User's prompt for ChatGPT.
 * @param response `string` - ChatGPT response.
 */
function RadChatResponseCtor({localeDateStr, localeTimeStr, prompt, response}) {
  this.dateTimeStr = `${localeDateStr} - ${localeTimeStr}`;
  this.prompt = prompt;
  this.response = response;
}

const radEMState = {
  currentRequestText: "", //string
  chatResponses: [], //ChatResponse[]
};

const test_state = {
  currentRequestText: "",
  chatResponses:  [],
};