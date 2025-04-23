const state = {
  requestText: "", //string
  //string[]
  chatResponses: [],
};

const test_state = {
  requestText: "",
  chatResponses:  ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dictum nulla. Sed sem nisl, porttitor sit amet leo at, lacinia aliquet metus.",
    "Nam magna nibh, malesuada eu blandit id, eleifend sed arcu.",
    "Donec finibus auctor nibh at semper. Donec efficitur, nisi feugiat efficitur ornare, quam urna ultricies nisl, ut lobortis tortor ex a orci. Vivamus consectetur tincidunt erat, eu condimentum odio tristique quis. Curabitur non porta est, ac tristique nulla. Pellentesque vel odio nec ante ultrices fringilla. Duis ex ante, scelerisque quis ultrices sit amet, venenatis sit amet urna. Vivamus nec aliquam orci. Suspendisse potenti. Donec sodales sed ante at venenatis. Fusce mollis lacus ut rutrum rutrum. Donec at molestie urna. Curabitur et semper lacus. Phasellus quis orci rhoncus, ullamcorper metus ac, placerat justo.",
    "Yes, elephants can paint. There are several elephants, particularly in places like Thailand and other parts of Asia, that have been trained to paint using brushes and canvases. These elephants are often part of art programs where they learn to create simple artworks. The painting activity is typically gentle and allows the elephants to express themselves in a unique way. However, it's essential to consider the ethical implications of such training and ensure that the elephants are treated humanely and that their welfare is prioritized.",
    "The most famous elephant known for painting is probably **Happy the Elephant**. Happy gained popularity due to her ability to create artwork using a paintbrush held in her trunk. She is often associated with art demonstrations and exhibitions, showcasing her unique talent. However, there are other elephants, like **Sammy** and **Nandi**, that have also captured public attention through their painting abilities. These elephants have been featured in various media, highlighting their artistic skills.",
    "# Sample Markdown Title using ```markedjs```.",
  ],
};

/*************************************************************************************************/
/**
 * Main code for the index page.
 * @returns object of things to use.
 */
const RadIndexMain = () => {

  const renderBottomContent = () => {
    const pageBottomNode = document.getElementById("page_bottom");
    
    const bottomFiller = rad_lib.radCreateElement({
      htmlTagName: "h5",
      elementId: "bottom_filler",
      innerText: "Powered by The Senator",
    });
    pageBottomNode.appendChild(bottomFiller);
  };

  const renderMainContainer = () => {
    const mainContainer = document.getElementById("main_container");
    Object.assign(mainContainer.style, style_MainContainer);
  }

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
    middleContent.appendChild(responsesSection);
    state.chatResponses.forEach((responseStr, index, array) => {
      const responseElement = renderResponseSection(responseStr, index);
      responsesSection.appendChild(responseElement);
    });
    /** END middle main content. **/

    /** START lower main content. **/
    const lowerContent = rad_lib.radCreateElement({
      htmlTagName: "div",
      elementId: "lower_main_content",
      styles: [style_CenterFlex, style_PaddingNormal],
    });
    
    const textArea = rad_lib.radCreateElement({
      htmlTagName: "textarea",
      elementId: "user_request_text",
      styles: [style_RequestTextarea],
    });

    const submitButton = rad_lib.radCreateButton({
      label: "Submit Request",
      elementId: "submit_request_button",
      styles: [style_MarginNormal],
      onclickFn: async () => {
        const chatResponse = await rad_server_api.chat(textArea.value);
        state.chatResponses.push(chatResponse.response);
        const response = renderResponseSection(chatResponse.response, state.chatResponses.length - 1);
        responsesSection.appendChild(response);
      },
    });

    lowerContent.appendChild(textArea);
    lowerContent.appendChild(submitButton);
    /** END lower main content. **/

    /** Append to Main Content. */
    mainContentNode.appendChild(middleContent);
    mainContentNode.appendChild(lowerContent);
  };

  const renderPageTop = () => {
    const pageTopNode = document.getElementById("page_top");
    
    const title = rad_lib.radCreateElement({
      htmlTagName: "h1",
      classNames: ["app_title"],
    });
    title.innerText = "The Electric Meatball"

    pageTopNode.appendChild(title);
  };

  const renderResponseSection = (chatResponseStr, key) => {
    const responseSection = rad_lib.radCreateElement({
      htmlTagName: "p",
      elementId: `response_section_${key}`,
      styles: [style_MarginNormal, style_ResponseSection]
    });
    responseSection.innerHTML = marked.parse(chatResponseStr)
    return responseSection;
  };

  //Public
  const render = () => {
    state.chatResponses = Object.assign(state.chatResponses, test_state.chatResponses);
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