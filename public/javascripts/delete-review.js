const reviewId = document.URL.split('/')[5];
// console.log("reviewId: ", reviewId);

const button = document.getElementById("delete-review");



button.addEventListener("click", (e) => {
    (async function() {
        const fetchCall =  await fetch('/reviews/' + reviewId, {
            method: 'DELETE',
            redirect: 'follow' //tells function not to redirect automatically; something else will redirect it
        });
    })();
    // e.stopPropagation;

});
