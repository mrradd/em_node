class ChatResponse {
  constructor({ dateStr, prompt, response }) {
    this.dateStr = dateStr;
    this.prompt = prompt;
    this.response = response;
  }
}

const radEMState = {
  currentRequestText: "", //string
  chatResponses: [], //ChatResponse[]
  chatGroups: [],
  models: [],
  user: {}
};