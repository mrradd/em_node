class ChatDataModelDto {
  constructor() {
    this.id = ""; //UUID
    this.response_id = ""; //UUID
    this.chat_id = ""; //UUID
    this.prompt = "";
    this.response = "";
    this.prompt_char_count = 0;
    this.response_char_count = 0;
    this.prompt_tokens = 0;
    this.completion_tokens = 0;
    this.reasoning_tokens = 0;
    this.date_iso = "";
  }
}