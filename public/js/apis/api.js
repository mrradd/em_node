const RadServerApi = () => {
  const baseServerUrl = "http://localhost:3042"

  /**
   * Makes a request to the server API to see if it is running.
   * @returns fetch response object.
   */
  const chat = async (requestText) => {
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
    }
  };

  /**
   * Makes a request to the server API to see if it is running.
   * @returns fetch response object.
   */
  const heartbeat = async () => {
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
    }
  };

  /**
   * Makes a request to the server API to receive a predefined test chat result.
   * @returns fetch response object.
   */
  const testChat = async () => {
    try {
      const response = await fetch(`${baseServerUrl}/test_chat`);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      console.log(`$$$ ${JSON.stringify(await response.json())}`);
      return response;
    }
    catch (error) {
      console.log(`ERROR ServerApi::testChat ${error.message}`);
    }
  };

  const exportObject = {
    chat: chat,
    heartbeat: heartbeat,
    testChat: testChat,
  };
  return exportObject;
};

const rad_server_api = RadServerApi();