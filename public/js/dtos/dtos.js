class ChatDataDto {
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
    this.date = "";
  }
}

class ChatGroupDto {
  constructor() {
    this.id = ""; //UUID
    this.user_id = ""; //UUID
    this.display_name = "";
    this.date_created = "";
  }
}

class MemoryDto {
  constructor () {
    this.id = ""; //UUID
    this.user_id = ""; //UUID
    this.description = "";
    this.date_created = "";
  }
}

class GptModelDto {
  constructor() {
    this.id = ""; //UUID
    this.name = "";
  }
}

class UserDto {
  constructor() {
    this.id =""; //UUID
    this.username = "";
    //--hashed_password TEXT,
    //--salt TEXT,
    this.date_created = "";
  }
}