/*************************************************************************************************/
/**
 * Main code for the index page.
 * @returns object of things to use.
 */
const RadIndexMain = () => {
  console.log("index_main");

  const renderMainContent = () => {
    const mainContentNode = document.getElementById("main_content");
    const textArea = rad_lib.radCreateElement({
      htmlTagName: "textarea",
      elementId: "user_request_text",
    });

    mainContentNode.appendChild(textArea);
    console.log(textArea);
    textArea.autofocus = true;  
  };

  const renderPageTop = () => {
    const pageTopNode = document.getElementById("page_top");
    const nav = rad_lib.radCreateElement({
      htmlTagName: "div",
      elementId: "top_nav"
    });

    const mainPageBtn = rad_lib.radCreateButton({
      id: "main_page_btn",
      label: "Main Page",
      //TODO CH  TESTING.
      onclickFn: () => {
        const btn = rad_lib.radCreateButton({
          label:"derp",
          onclickFn: () => {alert("herp");}
        });
        nav.appendChild(btn);
      }
    });

    nav.appendChild(mainPageBtn);
    pageTopNode.appendChild(nav);
  };

  const render = () => {
    renderPageTop();
    renderMainContent();

  };

  const exportObject = {
    render: render,
  };
  return exportObject;
}

/*************************************************************************************************/
const rad_index = RadIndexMain();
rad_index.render();