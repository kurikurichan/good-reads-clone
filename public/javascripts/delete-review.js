const reviewId = document.URL.split('/')[5];
// console.log("reviewId: ", reviewId);

const hauntId = document.getElementsByName("hauntId")[0].value
console.log(hauntId)

const button = document.getElementById("delete-review");



button.addEventListener("click", (e) => {
    (async function() {
        const fetchCall =  await fetch('/reviews/' + reviewId, {
            method: 'DELETE',
            redirect: 'follow' //tells function not to redirect automatically; something else will redirect it
        });
        window.location.href = `/haunts/` + hauntId
        console.log(fetchCall.url) // THIS CONSOLE.LOG MADE THE SITE WORK DON'T TOUCH IT GODDAMNIT
        return fetchCall
    })();
    // e.stopPropagation;

});
