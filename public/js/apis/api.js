const getHostUrl = () => {
  if(window.location.port?.length > 0) {
    return `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  }
  else {
    return `${window.location.protocol}//${window.location.hostname}`;
  }
}

let apiBaseUrl = "";

class RadServerApi {

  constructor() {
    apiBaseUrl = getHostUrl();
    console.log(apiBaseUrl);
  }

  /**
   * Makes a request to the server API to see if it is running.
   * @returns `ChatDataModelDto` object.
   */
  static async chat (requestText) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/llm/chat`, {
        method: "post",
        body: JSON.stringify({requestText: requestText}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      let dto = new ChatDataModelDto();
      dto = json.data;
      return dto
    }
    catch (error) {
      console.log(`ERROR ServerApi::chat ${error.message}`);
      return null;
    }
  }

  static async getAllMessages (){
    try {
      const response = await fetch(`${apiBaseUrl}/api/llm/all`, {method: "get",});

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    }
    catch (error) {
      console.log(`ERROR ServerApi::getAllChats ${error.message}`);
      return null;
    }
  }

  /**
   * Makes a request to the server API to see if it is running.
   * @returns fetch response object.
   */
  static async heartbeat(){
    try {
      const response = await fetch(`${apiBaseUrl}/heartbeat`);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      console.log(`$$$ ${JSON.stringify(await response.json())}`);
      return response;
    }
    catch (error) {
      console.log(`ERROR ServerApi::heartbeat ${error.message}`);
      return null;
    }
  }
};