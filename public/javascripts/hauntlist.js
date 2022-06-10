document.addEventListener("DOMContentLoaded", e => {
  //check if in edit mode
  let editMode = false;
  const editButton = document.querySelector("#list-edit-button");
  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("id", "cancelButton");
  cancelButton.innerText = "Cancel";

  // remove cancel button & x delete buttons
  const removeEdit = () => {
    cancelButton.remove();
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(deleteButton => {
      deleteButton.remove();
    });
    editButton.innerText = "Edit List";
  };

  // Find delete buttons (could be none)
  let deleteButtons = document.querySelector(".hide");

  editButton.addEventListener("click", event => {
    editMode ? (editMode = false) : (editMode = true); // toggle edit mode on/off with each click

    if (editMode) {
      editButton.innerText = "Save Changes";
      // add cancel button in edit mode
      const editButtonsDiv = document.querySelector("#editButtons");
      editButtonsDiv.append(cancelButton);
      // grab the boxes with haunts in them & append x buttons to them
      const hauntLis = document.querySelectorAll(".haunt-line li");
      hauntLis.forEach(hauntLi => {
        const deleteButton = document.createElement("button");
        deleteButton.classList = "delete";
        deleteButton.innerText = "x";
        deleteButton.setAttribute("id", hauntLi.getAttribute("id") + "-button");
        hauntLi.append(deleteButton);
      });

      deleteButtons = document.querySelectorAll(".delete");

      // add click functionality to x buttons
      deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", e => {
          const buttonId = e.target.getAttribute("id");
          const hauntId = buttonId.split("-")[1];
          const divToHide = document.querySelector("#haunt-" + hauntId);
          divToHide.classList.add("hide"); 
        });
      });
    }

    // Click save changes -- switch out of edit mode
    if (!editMode) {
      // find all hidden elements - get url of this haunt list
      const hiddenEles = document.querySelectorAll(".hide");

      hiddenEles.forEach((ele, i, obj) => {
        const deleteHaunt = async () => {
          const hauntListId = await getHauntListId();
          const hauntId = ele.id.split("-")[1];

          const res = await fetch("/hauntlists/" + hauntListId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hauntId }),
          });
        };
        deleteHaunt();
      });
      removeEdit();
    }
  }); //------ end event listener

  cancelButton.addEventListener("click", e => {
    editMode ? (editMode = false) : (editMode = true);
    removeEdit();
  });

  const getHauntListId = async () => {
    const hauntlistURL = await document.URL.split("/");
    return hauntlistURL[hauntlistURL.length - 1];
  };

  //remove haunts from page when deleted
  //but dont save deletion till save button pressed
});
