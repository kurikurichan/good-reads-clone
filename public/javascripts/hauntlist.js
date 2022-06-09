document.addEventListener("DOMContentLoaded", e => {
  //check if in edit mode
  let editMode = false;
  const editButton = document.querySelector("#list-edit-button");
  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("id", "cancelButton");
  cancelButton.innerText = "Cancel";

  const removeEdit = () => {
    cancelButton.remove();
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(deleteButton => {
      deleteButton.remove();
    });
    editButton.innerText = "Edit List";
  };
  let deleteButtons = document.querySelector(".hide");

  editButton.addEventListener("click", event => {
    editMode ? (editMode = false) : (editMode = true);
    console.log("editMode", editMode);
    if (editMode) {
      editButton.innerText = "Save Changes";
      const editButtonsDiv = document.querySelector("#editButtons");
      editButtonsDiv.append(cancelButton);
      const hauntLis = document.querySelectorAll(".haunt-line li");
      hauntLis.forEach(hauntLi => {
        const deleteButton = document.createElement("button");
        deleteButton.classList = "delete";
        deleteButton.innerText = "x";
        deleteButton.setAttribute("id", hauntLi.getAttribute("id") + "-button");
        hauntLi.append(deleteButton);
      });
      deleteButtons = document.querySelectorAll(".delete");

      //delete button click
      deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", e => {
          const buttonId = e.target.getAttribute("id");
          const hauntId = buttonId.split("-")[1];
          const divToHide = document.querySelector("#haunt-" + hauntId);
          divToHide.classList.add("hide");
        });
      });
    } else {
      // Click save changes
      const hiddenEles = document.querySelectorAll(".hide");
      const hauntlistURL = document.URL.split("/");
      const hauntlistId = hauntlistURL[hauntlistURL.length - 1];
      console.log("hiddenEles", hiddenEles);
      const hauntsToDelete = [];
      hiddenEles.forEach(ele => {
        hauntsToDelete.push(ele.id.split("-")[1]);
        console.log("ele!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", ele.id);
        console.log("hauntsToDelete", hauntsToDelete);
      });
      // remove haunt from hauntlist
      console.log("hauntsToDelete", hauntsToDelete);
      const deleteHaunts = async () => {
        await fetch("/hauntlists/" + hauntlistId, {
          method: "DELETE",
          body: hauntsToDelete,
        });
      };
      deleteHaunts();
      removeEdit();
    }
  });

  cancelButton.addEventListener("click", e => {
    editMode ? (editMode = false) : (editMode = true);
    removeEdit();
  });

  //remove haunts from page when deleted
  //but dont save deletion till save button pressed
});
