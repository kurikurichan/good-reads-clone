// Script to hide and show dropdown for adding haunts to hauntlist on haunts/:id page

document.addEventListener("DOMContentLoaded", e => {
  const dropdownHauntlist = document.querySelector("#dropdown-hauntlists");
  const dropdownButton = document.querySelector("#dropdownButton");
  const dropdownHauntlistChildren = document.querySelectorAll(
    "#dropdown-hauntlists *"
  );
  const url = document.URL.split("/");
  const hauntId = url[url.length - 1];

  dropdownButton.addEventListener("click", e => {
    dropdownHauntlist.classList.toggle("hide");
  });

  dropdownHauntlistChildren.forEach(button => {
    button.addEventListener("click", async e => {
      await fetch("/haunlists/" + hauntId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hauntId: button.value }),
      });
    });
  });
});

// TODO: create action of clicking buttons add haunt to hauntlists
