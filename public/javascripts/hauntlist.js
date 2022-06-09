document.addEventListener("DOMContentLoaded", e => {
  //check if in edit mode
  let editMode = false;
  const editButton = document.querySelector("#list-edit-button");

  editButton.addEventListener("click", event => {
    if (editMode) {
      editMode = false;
      editButton.innerText = "Edit List";
    } else {
      editMode = true;
      editButton.innerText = "Save Changes";
      //Save changes to hauntlist
    }

    if (editMode) {
      const hauntLis = document.querySelectorAll(".haunt-line li");
      hauntLis.forEach(hauntLi => {
        const deleteButton = document.createElement("button");
        deleteButton.classList = "delete";
        deleteButton.innerText = "x";
        deleteButton.setAttribute("id", hauntLi.getAttribute("id") + "-button");
        hauntLi.append(deleteButton);

        //After delete buttons created
        const deleteButtons = document.querySelector(".delete");
        deleteButtons.addEventListener("click", e => {
          const buttonId = e.target.getAttribute("id");
          const hauntId = buttonId.split("-")[1];
          const divToHide = document.querySelector("#haunt-" + hauntId);
          divToHide.classList += "hide";
        });
      });
    } else {
      const deleteButtons = document.querySelectorAll(".delete");
      deleteButtons.forEach(deleteButton => {
        deleteButton.remove();
      });
    }
  });

  //remove haunts from page when deleted
  //but dont save deletion till save button pressed
});
