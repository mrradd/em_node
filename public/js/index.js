/*************************************************************************************************/
const rad_indexMain = () => {
  console.log("index_main");

  const rad_generateButton = ({id, label, onclickFn}) => {
    return `<button id=${id} >${label}</button>`;
  };

  const derp = () => {
    console.log("flerp");
  };
  
  const flim = () => {
    alert("flam");
  };

  const rad_pageSetup = () => {
    const pageTopNode = document.getElementById("page_top").innerHTML = rad_generateButton(
      {
        id: "btn1",
        label: "Cool Button",
        onCickFn: "derp"
      });

    console.log(document.getElementById("btn1"))
    document.getElementById("btn1").addEventListener("click", derp);
  };

  rad_pageSetup();

  //I can do an exports type thing like this then use the properties later. Interesting.
  return {
    flim: flim,
  };
}

/*************************************************************************************************/
const x = rad_indexMain();