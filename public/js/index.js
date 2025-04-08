
const rad_generateButton = ({id, label, onclickFn}) => {
  return `<button id=${id} onclick=${onclickFn}>${label}</button>`;
}
const derp = () => {
  console.log("flerp");
}
/*************************************************************************************************/
const rad_indexMain = () => {
  console.log("index_main");

  const rad_pageSetup = () => {
    const pageTopNode = document.getElementById("page_top").innerHTML = rad_generateButton(
      {
        id: "btn1",
        label: "Cool Button",
        onCickFn: "derp"
      });
  }

  rad_pageSetup();
}

/*************************************************************************************************/
rad_indexMain();