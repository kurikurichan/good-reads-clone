document.addEventListener("DOMContentLoaded", e => {
let deleteMode = false

//target the delete button
const deleteButton = document.querySelector("#delete");

//create a cancel button and give it properties
const cancelButton = document.createElement("button")
cancelButton.setAttribute("id", "cancelButton")
cancelButton.innerText = "Cancel";


//helper function to remove the checkboxes, revert delete button
const removeDelete = () => {
  cancelButton.remove()
  const deleteCheckBoxes = document.querySelectorAll(".checkBoxes")
  deleteCheckBoxes.forEach(checkBox => {
    checkBox.remove();
  })
  deleteButton.innerText = "Delete a Hauntlist"
}

let checkBoxes = document.querySelector(".hide");

//toggle delete mode
deleteButton.addEventListener("click", event => {
  deleteMode ? (deleteMode = false) : (deleteMode = true)

  if (deleteMode) {
    deleteButton.innerText = "Confirm" //delete becomes save

    //adds cancel button in delete mode
    const deleteButtonsDiv = document.querySelector("#deleteButtons");
      deleteButtonsDiv.append(cancelButton);

    // grabs each hauntlist and appends checkboxes to them
    const checkBoxLis = document.querySelectorAll(".checkBoxes-line li");
    checkBoxLis.forEach(checkBoxLi =>{
      const seeCheckBox = document.createElement('input');
      seeCheckBox.type = "checkbox"
      seeCheckBox.classList = "delete";
      seeCheckBox.setAttribute("id", checkBoxLi.getAttribute("id") + "-checkbox");
      checkBoxLi.append(seeCheckBox);
    });

    deleteButtons = document.querySelectorAll(".delete");

  }

})




})
