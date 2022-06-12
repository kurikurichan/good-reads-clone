
document.addEventListener("DOMContentLoaded", e => {
let deleteMode = false

//target the delete button
const deleteButton = document.querySelector("#delete");

//create a cancel button and give it properties
const cancelButton = document.createElement("button")
cancelButton.setAttribute("id", "cancelButton")
cancelButton.innerText = "Cancel";

const ogText = document.getElementsByTagName("h2")[0].innerText;

//helper function to remove the checkboxes, revert delete button
const removeDelete = () => {
  cancelButton.remove()

  const deleteCheckBoxes = document.querySelectorAll(".preChecked")

  deleteCheckBoxes.forEach(checkBox => {


    checkBox.remove();


    //revert the
    document.getElementsByTagName("h2")[0].innerText = ogText

    //remove all lis with a checked check box

    const list = document.querySelectorAll("li");
    const checked = document.querySelectorAll(":checked");

        list.forEach(li => {
          checked.forEach(checked => {
            if(li.contains(checked)) li.remove()

          })
        })







  })
  deleteButton.innerText = "Delete a Hauntlist"
}

// let checkBoxes = document.querySelector(".hide");  //do we need this?

//toggle delete mode
  deleteButton.addEventListener("click", event => {
    deleteMode ? (deleteMode = false) : (deleteMode = true)

    if (deleteMode) {
      //alert("Select lists to delete")
      document.getElementsByTagName("h2")[0].innerText += "\n(Select lists to delete)";


      deleteButton.innerText = "Confirm" //delete becomes save

      //adds cancel button in delete mode
      const deleteButtonsDiv = document.querySelector("#deleteButtons");
        deleteButtonsDiv.append(cancelButton);

      // grabs each hauntlist and appends checkboxes to them
      const checkBoxLis = document.querySelectorAll(".checkBoxes-line li");
      checkBoxLis.forEach(checkBoxLi =>{
        const seeCheckBox = document.createElement('input');
        seeCheckBox.type = "checkbox"
        seeCheckBox.classList = "preChecked";
        seeCheckBox.setAttribute("id", checkBoxLi.getAttribute("id") + "-checkbox");  // this is coming up as null -checkbox
        checkBoxLi.append(seeCheckBox);

      });
    }

    const getUserId = async () => {
      const userURL = await document.URL.split("/");
      return userURL[userURL.length - 1];
    };

    if(!deleteMode){

      const allCheckBoxes = document.querySelectorAll(".preChecked")



      allCheckBoxes.forEach(checkBox => {


        if (checkBox.checked) {


          const deleteHauntList = async () => {
            const userId = await getUserId();
            const hauntListId = checkBox.id.split("-")[0]

            const res = await fetch("/hauntlists/" + hauntListId, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ hauntListId }),
            })
          };
          deleteHauntList();

        }
      });
      removeDelete();
    }

  })


  cancelButton.addEventListener("click", e => {
    deleteMode ? (deleteMode = false) : (deleteMode = true);
    removeDelete();
  });




 })
