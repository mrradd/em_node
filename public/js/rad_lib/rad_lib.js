const RadLib = () => {
  const CSS_CLASSES = {
    rad_button: "rad_button",
  };

  /**
   * Creates an HTML button element with the passed in values.
   * @param elementId `string` - ID for the button. Defaults to "".
   * @param label `string` - Label for the button.
   * @param onclickFn `function` - Function to call when clicked.
   * @param classNames `string[]` - Array of CSS class names. Defaults to [].
   * @returns HTML button element.
   */
  const radCreateButton = ({elementId = "", label, onclickFn, classNames = []}) => {
    const button = radCreateElement({
      htmlTagName: "button",
      elementId: elementId,
      classNames: [...classNames, CSS_CLASSES.rad_button],
    });

    button.onclick = onclickFn;
    button.innerText = label;
    return button;
  };

  /**
   * Creates an HTML element of the passed in html tag name with the passed in values.
   * @param htmlTagName `string` - Name of the HTML element tag to generate.
   * @param elementId `string` - ID for the button.
   * @param classNames `string[]` - Array of CSS class names. Defaults to [].
   * @returns HTML button element.
   */
  const radCreateElement = ({htmlTagName, elementId, classNames = []}) => {
    const element = document.createElement(htmlTagName);

    if(elementId && elementId.length > 0) {
      element.id = elementId;
    }
    
    if(classNames.length > 0) {
      element.classList = [...classNames];
    }

    return element
  }

  /**
   * Opens a new tab at the passed in url.
   * @param url `string` - URL to navigate to in the new tab.
   */
  const radOpenNewTabAt = ({url}) => {
    //TODO CH  MAKE VALIDATION MORE ROBUST.
    if(!url || url?.length === 0) {
      console.log("radOpenNewTabAt: Invalid url.");
      return;
    }

    window.open(url, "_blank");
  };

  /** All the exposed public properties. */
  const exportObject = {
    radCreateButton: radCreateButton,
    radCreateElement: radCreateElement,
    radOpenNewTabAt: radOpenNewTabAt,
  };
  return exportObject;
};

/**
 * General purpose library for Rad stuff.
 * @returns `Object` containing public attributes and functions.
 **/
const rad_lib = RadLib();