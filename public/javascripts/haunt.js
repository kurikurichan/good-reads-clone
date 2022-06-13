// Script to hide and show dropdown for adding haunts to hauntlist on haunts/:id page

document.addEventListener("DOMContentLoaded", e => {
  const dropdownHauntlist = document.querySelector("#dropdown-hauntlists");
  const dropdownButton = document.querySelector("#dropdownButton");
  const dropdownHauntlistChildren = document.querySelectorAll(
    "#dropdown-hauntlists *"
  );
  const url = document.URL.split("/");
  const hauntlistId = url[url.length - 1];

  dropdownButton.addEventListener("click", e => {
    dropdownHauntlist.classList.remove("hide");
  });

  window.addEventListener("click", e => {
    if (
      !e.target.classList.contains("dropdown") &&
      e.target != dropdownButton
    ) {
      dropdownHauntlist.classList.add("hide");
    }
  });

  dropdownHauntlistChildren.forEach(button => {
    if (button.tagName == "BUTTON") {
      button.addEventListener("click", async e => {
        const res = await fetch("/hauntlists/" + hauntlistId, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hauntId: button.value }),
        });
      });
    }
  });
});
