const reviewId = document.URL.split('/')[5];
console.log("reviewId: ", reviewId);

const button = document.getElementById("delete-review");

button.addEventListener("click", (e) => {
    e.stopPropagation;

    (async function() {
        return await fetch('/reviews/' + reviewId, {
            method: 'DELETE'
        });

    })();
});
