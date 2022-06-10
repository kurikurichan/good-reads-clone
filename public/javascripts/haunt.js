// Script to hide and show dropdown for adding haunts to hauntlist on haunts/:id page

document.addEventListener("DOMContentLoaded", e => {
  const hauntlists = document.querySelectorAll(".hauntlist"); // children li's of add haunt list button
  const addToHauntlist = document.querySelectorAll("#addToHauntlist *"); // "Add to Haunt List" button + its children buttons (inside divs)

  document.addEventListener("click", e => {
    console.log(e.target);
  });

  // iterate through user's hauntlists & hide & show buttons
  addToHauntlist.forEach(hauntListEle => {

    // show buttons
    hauntListEle.addEventListener("focus", e => {
      hauntlists.forEach(hauntlist => {
        hauntlist.classList.remove("hide");
      });
    });

    // hide buttons
    hauntListEle.addEventListener("focusout", e => {
      hauntlists.forEach(hauntlist => {
        hauntlist.classList.add("hide");
      });
    });
  });

  // iterate through children divs
  hauntlists.forEach(dive => {

    // add action to button click
    dive.addEventListener("click", e => {
      e.stopPropagation();
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      console.log(e.target);
    });
  });
});


// TODO: create action of clicking buttons add haunt to hauntlists
