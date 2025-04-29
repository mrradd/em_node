/**
 * Main code for the index page.
 * @returns object of things to use.
 */
const RadIndexMain = () => {

  /**
   * 
   */
  const renderBottomContent = () => {
    const pageBottomNode = document.getElementById("page_bottom");
    
    const poweredBy = rad_lib.radCreateElement({
      htmlTagName: "a",
      elementId: "powered_by",
      innerText: "Powered by The Senator",
      classNames: ["powered_by",],
    });
    pageBottomNode.appendChild(poweredBy);
    poweredBy.setAttribute("href", "https://thesenator.dev");
  };

  /**
   * 
   */
  const renderMainContainer = () => {
    const mainContainer = document.getElementById("main_container");
    Object.assign(mainContainer.style, style_MainContainer);
  };

  /**
   * 
   */
  const renderMainContent = () => {
    const mainContentNode = document.getElementById("main_content");

    /** START middle main content. **/
    const middleContent = rad_lib.radCreateElement({
      htmlTagName: "div",
      elementId: "middle_main_content",
      styles: [style_CenterFlex, style_PaddingNormal],
    });
    
    const responsesSection = rad_lib.radCreateElement({
      htmlTagName: "div",
      elementId: "responses_section",
      styles: [style_ResponsesSection]
    });
    
    radEMState.chatResponses.forEach((chat, index, array) => {
      const responseObj = new ChatResponse({
        dateStr: chat.date,
        prompt: chat.prompt,
        response: chat.response,
      });
      radEMState.chatResponses.push(responseObj);

      const responseText = EMUtils.compilePromptAnswerText(responseObj);

      const responseElement = renderResponseSection(responseText, index);
      responsesSection.appendChild(responseElement);
    });

    middleContent.appendChild(responsesSection);
    /** END middle main content. **/

    /** START lower main content. **/
    const lowerContent = rad_lib.radCreateElement({
      htmlTagName: "div",
      elementId: "lower_main_content",
      styles: [style_CenterFlex, style_PaddingNormal],
    });
    
    const resquestTextArea = rad_lib.radCreateElement({
      htmlTagName: "textarea",
      elementId: "user_request_text",
      styles: [style_RequestTextarea],
    });

    const submitButton = rad_lib.radCreateButton({
      label: "Submit Request",
      elementId: "submit_request_button",
      styles: [style_MarginNormal],
      onclickFn: async () => {

        rad_lib.radThrobberShow({
          parentElement: middleContent
        });
        const chatResponse = await RadServerApi.chat(resquestTextArea.value);
        rad_lib.radThrobberRemove();

        if(!chatResponse) {
          alert("ERROR: submitButton: No chat response.");
          return;
        }

        const responseObj = new ChatResponse({
          dateStr: chatResponse.date,
          prompt: chatResponse.prompt,
          response: chatResponse.response,
        });
        radEMState.chatResponses.push(responseObj);

        const responseText = EMUtils.compilePromptAnswerText(responseObj);
        const responseSection = renderResponseSection(
          responseText,
          radEMState.chatResponses.length - 1,
        );
        responsesSection.appendChild(responseSection);
      },
    });

    lowerContent.appendChild(resquestTextArea);
    lowerContent.appendChild(submitButton);
    /** END lower main content. **/

    /** Append to Main Content. */
    mainContentNode.appendChild(middleContent);
    mainContentNode.appendChild(lowerContent);
  };

  /**
   * 
   */
  const renderPageTop = () => {
    const pageTopNode = document.getElementById("page_top");
    
    const title = rad_lib.radCreateElement({
      htmlTagName: "h1",
      classNames: ["app_title"],
    });
    title.innerText = "The Electric Meatball"

    pageTopNode.appendChild(title);
  };

  /**
   * Creates an element that displays the chate prompt and response.
   * @param chatResponseStr `string` - Response from ChatGPT.
   * @param key `string` - Unique identifier that is appended to the ID of the element.
   * @returns 
   */
  const renderResponseSection = (chatResponseStr, key) => {
    const responseSection = rad_lib.radCreateElement({
      htmlTagName: "p",
      elementId: `response_section_${key}`,
      classNames: ["response_section"],
      styles: [style_MarginNormal, style_ResponseSection]
    });
    responseSection.innerHTML = marked.parse(chatResponseStr)
    return responseSection;
  };

  /**
   * 
   */
  const render = async () => {
    const chats = await RadServerApi.getAllMessages();
    radEMState.chatResponses = [...chats.data];
    renderMainContainer();
    renderPageTop();
    renderMainContent();
    renderBottomContent();

    //Go to the bottom of the responses list.
    const responseListDiv = document.getElementById("responses_section");
    responseListDiv.scrollTop = responseListDiv.scrollHeight;
  };

  const exportObject = {
    render: render,
  };
  return exportObject;
}

/*************************************************************************************************/
window.onload = async () => {
  const rad_index = RadIndexMain();
  await rad_index.render();
}