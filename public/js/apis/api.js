const baseServerUrl = "http://localhost:3042";

class RadServerApi {
  /**
   * Makes a request to the server API to see if it is running.
   * @returns fetch response object.
   */
  static async chat (requestText) {
    try {
      const response = await fetch(`${baseServerUrl}/api/llm/chat`, {
        method: "post",
        body: JSON.stringify({requestText: requestText}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    }
    catch (error) {
      console.log(`ERROR ServerApi::chat ${error.message}`);
      return null;
    }
  }

  static async getAllMessages (){
    try {
      const response = await fetch(`${baseServerUrl}/api/llm/all`, {method: "get",});

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
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
      const response = await fetch(`${baseServerUrl}/heartbeat`);
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