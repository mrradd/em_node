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
   * @param styles `Object[]` - Array of css style objects.
   * @returns HTML button element.
   * @throws
   */
  const radCreateButton = ({elementId = "", label, onclickFn, classNames = [], styles = []}) => {
    if(!onclickFn) {
      throw new Error("onclickFn must be defined.");
    }

    const button = radCreateElement({
      htmlTagName: "button",
      elementId: elementId,
      classNames: [...classNames, CSS_CLASSES.rad_button],
      styles,
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
   * @param styles `Object[]` - Array of CSS styling rule objects. Defaults to [].
   * @param innerText `string` - String that displays inside the element.
   * @returns HTML element of the type defined by htmlTagName.
   * @throws
   */
  const radCreateElement = ({htmlTagName, elementId = "", classNames = [], styles = [], innerText = ""}) => {
    if(!htmlTagName) {
      throw new Error("htmlTagName must be provided.");
    }
    const element = document.createElement(htmlTagName);

    if(elementId?.length > 0) {
      element.id = elementId;
    }
    
    if(classNames?.length > 0) {
      element.classList = [...classNames];
    }

    if(styles?.length > 0) {
      Object.assign(element.style, ...styles);
    }

    if(innerText?.length > 0) {
      element.innerText = innerText;
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