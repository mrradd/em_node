const state = {
  requestText: "",
};

/*************************************************************************************************/
/**
 * Main code for the index page.
 * @returns object of things to use.
 */
const RadIndexMain = () => {

  const renderMainContainer = () => {
    const mainContainer = document.getElementById("main_container");
    Object.assign(mainContainer.style, style_MainContainer);
  }

  const renderPageTop = () => {
    const pageTopNode = document.getElementById("page_top");
    
    const title = rad_lib.radCreateElement({
      htmlTagName: "h1",
      classNames: ["app_title"]
    });
    title.innerText = "The Electric Meatball"

    pageTopNode.appendChild(title);
  };

  const renderMainContent = () => {
    const mainContentNode = document.getElementById("main_content");

    /** START middle main content. **/
    const middleContent = rad_lib.radCreateElement({
      htmlTagName: "div",
      elementId: "middle_main_content"
    });
    Object.assign(middleContent.style, style_CenterFlex);
    /** END middle main content. **/

    /** START lower main content. **/
    const lowerContent = rad_lib.radCreateElement({
      htmlTagName: "div",
      elementId: "lower_main_content"
    });
    Object.assign(lowerContent.style, style_CenterFlex);
    
    const textArea = rad_lib.radCreateElement({
      htmlTagName: "textarea",
      elementId: "user_request_text",
    });
    Object.assign(textArea.style, style_RequestTextarea);

    const submitButton = rad_lib.radCreateButton({
      label: "Submit",
      elementId: "submit_button",
      onclickFn: () => {
        state.requestText = textArea.value;
        console.log(state.requestText);
        middleContent.innerText = state.requestText;
      }
    });

    lowerContent.appendChild(textArea);
    lowerContent.appendChild(submitButton);
    /** END lower main content. **/

    /** Append to Main Content. */
    mainContentNode.appendChild(middleContent);
    mainContentNode.appendChild(lowerContent);
  };

  const renderBottomContent = () => {
    const pageBottomNode = document.getElementById("page_bottom");
    
    const bottomFiller = rad_lib.radCreateElement({
      htmlTagName: "h3",
      elementId: "bottom_filler",
    });
    bottomFiller.innerText = "Bottom of the Page"

    pageBottomNode.appendChild(bottomFiller);
  };

  const render = () => {
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