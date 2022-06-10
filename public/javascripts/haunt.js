document.addEventListener("DOMContentLoaded", e => {
  // const hauntlistsButton = document.querySelector("#hauntlistsButton");
  const hauntlists = document.querySelectorAll(".hauntlist");
  const addToHauntlist = document.querySelector("#addToHauntlist *");
  // const notAddToHauntlist = document.querySelector(":not(#addToHauntlist)");

  addToHauntlist.classList.add("test");
  console.log("hauntlists", hauntlists);
  addToHauntlist.addEventListener("focus", e => {
    hauntlists.forEach(hauntlist => {
      hauntlist.classList.remove("hide");
    });
  });
  addToHauntlist.addEventListener("focusout", e => {
    if (document.activeElement.classList.contains("focusDropDown")) return;
    hauntlists.forEach(hauntlist => {
      hauntlist.classList.add("hide");
    });
  });
});
