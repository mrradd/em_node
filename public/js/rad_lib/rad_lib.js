/**
 * Every function in this library is, and should stay, static.
 * 
 * TODO CH
 * > Make <img> element function.
 * > Make <a> element function
 */
class RadLib {
  static RAD_ELEMENT_IDS() {
    return {
      rad_throbber: "rad_throbber"
    };
  }

  constructor() {}

  static CSS_CLASSES() {
    return {
      rad_button: "rad_button",
    }
  }

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
  static radCreateButton ({elementId = "", label, onclickFn, classNames = [], styles = []}) {
    if(!onclickFn) {
      throw new Error("onclickFn must be defined.");
    }

    const button = RadLib.radCreateElement({
      htmlTagName: "button",
      elementId: elementId,
      classNames: [...classNames, RadLib.CSS_CLASSES().rad_button],
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
  static radCreateElement ({htmlTagName, elementId = "", classNames = [], styles = [], innerText = ""}) {
    if(!htmlTagName) {
      throw new Error("htmlTagName must be provided.");
    }
    const element = document.createElement(htmlTagName);

    if(elementId?.length > 0) {
      element.id = elementId;
    }
    
    if(classNames?.length > 0) {
      let list = [...classNames]

      //We get rid of the commas, because if we just gave it an array it would be comma separated--CSS doesn't work like that.
      let str = list.join(',').replace(',', ' ');
      element.classList = str;
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
  static radOpenNewTabAt({url}) {
    if(!url || url?.length === 0) {
      console.log("radOpenNewTabAt: Invalid url.");
      return;
    }

    window.open(url, "_blank");
  }

  /**
   * Removes the Rad Throbber.
   */
  static radThrobberRemove() {
    const throbber = document.getElementById(RadLib.RAD_ELEMENT_IDS().rad_throbber);
    throbber.remove();
  }

  /**
   * Appends the Rad Throbber to the passed in element.
   * @param parentElement `HTMLElement` - The HTML Element to append the throbber to.
   */
  static radThrobberShow({parentElement}) {
    //TODO CH  TURN INTO AN ACTUAL THROBBER.
    const throbber = RadLib.radCreateElement({
      htmlTagName: "div",
      elementId: RadLib.RAD_ELEMENT_IDS().rad_throbber,
      innerText: "...THINKING...",
    });
    parentElement.appendChild(throbber);
  }
};