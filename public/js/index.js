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
      htmlTagName: "h5",
      elementId: "powered_by",
      innerText: "Powered by The Senator",
    });
    pageBottomNode.appendChild(poweredBy);
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
    
    radEMState.chatResponses.forEach((responseStr, index, array) => {
      const responseElement = renderResponseSection(responseStr, index);
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
        const chatResponse = await rad_server_api.chat(resquestTextArea.value);
        rad_lib.radThrobberRemove();

        const date = new Date();
        const responseObj = new RadChatResponseCtor({
          localeDateStr: date.toLocaleDateString(),
          localeTimeStr: date.toLocaleTimeString(),
          prompt: resquestTextArea.value,
          response: chatResponse.response,
        });
        radEMState.chatResponses.push(responseObj);

        const responseText = em_utils.em_compilePromptAnswerText(responseObj);
        const responseSection = renderResponseSection({
          chatResponseStr: responseText,
          key: radEMState.chatResponses.length - 1
        });
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
  const renderResponseSection = ({chatResponseStr, key}) => {
    const responseSection = rad_lib.radCreateElement({
      htmlTagName: "p",
      elementId: `response_section_${key}`,
      styles: [style_MarginNormal, style_ResponseSection]
    });
    responseSection.innerHTML = marked.parse(chatResponseStr)
    return responseSection;
  };

  //Public
  /**
   * 
   */
  const render = () => {
    radEMState.chatResponses = Object.assign(radEMState.chatResponses, test_state.chatResponses);
    renderMainContainer();
    renderPageTop();
    renderMainContent();
    renderBottomContent();
  };

  const exportObject = {
    render: render,
  };
  return exportObject;
}

/*************************************************************************************************/
window.onload = () => {
  const rad_index = RadIndexMain();
  rad_index.render();
}