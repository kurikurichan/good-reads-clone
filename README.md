# Good Haunts#

Good Haunts is a clone of Good Reads. It allows users to collect, share, and comment on their favorite haunted locations throughout the world.

<h4> Link to Live Application: <a href="https://good-haunts.herokuapp.com//">Good Haunts</a></h4>
<h4> Documentation: <a href="https://github.com/kurikurichan/good-reads-clone/wiki">Good Haunts Wiki</a></h4>

Splash Page (while not signed in)
![IMAGE DATE](IMAGE.PNGFILE)

Splash Page (while not signed in)
![IMAGE DATE](IMAGE.PNGFILE)
### Features ###

* Sign-up/login with credentials
* Easy-to-use, spooky interface
* Logged in users can make collections (Haunt Lists) of their favorite spooky places (Haunts)
* Logged in users can comment on their favorite Haunts
* Logged in users can edit/delete their own Haunt Lists
* Logged in users can create their own custom Haunt Lists
* Logged in users can edit/delete their own Comments
* Logged in users can rate Haunts





### Technical Details ###
* Creating and deleting Hauntlists proved to be a particularly tricky issue for us, as our goal was to have a user edit and delete Hauntlists dynamically without the need to refresh the page. In reference to checkboxes, we struggled to find a way to change a parent list item in the presence of a child checked box. The CSS selector :has, which can target parent elements of children, is only supported by Safari. Thus we had to come up with a more creative solution: storing a querySelectorAll in a variable to iterate through all li elements, removing those links with a checked box using .contains() and .remove().
```
    //remove all lis with a checked check box

    const list = document.querySelectorAll("li");
    const checked = document.querySelectorAll(":checked");

        list.forEach(li => {
          checked.forEach(checked => {
            if(li.contains(checked)) li.remove()

          })
        })



```
* Another issue we encountered with deleting Haunt Lists was the difficulty of deleting a cookie server side. The typical method of setting its expiration date to some time in the past was not working for us. Instead, we had to use the alternative method of setting the cookie’s original max age to -1.
```
const logoutUser = (req, res) => {
  delete req.session.auth;
  req.session.cookie.originalMaxAge = -1;
};

```
A large, app-breaking issue we were struggling with involved 500 errors with our routes while editing or deleting reviews. The error received stated,  “Can't set headers after they are sent." This was a particularly nefarious issue, since it would go relatively unnoticed running locally. However, this would break the performance of the application when pushed to Heroku, and would stop all functioning.
We learned that setting our request methods to GET would ensure that functions would not try to set a header after part of the body had already been written.


```
// EDIT review data - /reviews/:reviewId
router.post('/:id(\\d+)', csrfProtection, reviewValidator, asyncHandler(async(req, res) => {
    //TODO: deconstruct form data from review
    const reviewId = req.params.id;
    const { userId, hauntId, score, review } = req.body;
    const reviewToUpdate = await Review.findByPk(+reviewId)
    const haunt = await Haunt.findByPk(+hauntId);

    const validationErrors = validationResult(req);
    let errors = [];
    // await creating a new review with deconstructed data
    if (validationErrors.isEmpty()) {
        await reviewToUpdate.update({
            reviewId,
            userId,
            hauntId,
            review,
            score
        });

        if (reviewToUpdate) {
            await reviewToUpdate.save();
            await averageScore(+hauntId);
            req.method = "GET";
            return res.redirect(`/haunts/${+hauntId}`);
        }
        errors.push("Editing failed");
    } else {
        errors = validationErrors.array().map(err => err.msg);
    }
    res.render("edit-review", { review, score, haunt, csrfToken: req.csrfToken(), errors }); // might need to feed hauntId
}));

// DELETE review
router.delete('/:id(\\d+)', asyncHandler(async(req, res, next) => {

    const reviewId = req.params.id;
    const review = await Review.findByPk(+reviewId);
    const hauntId = review.hauntId;

    if (review) {

        await review.destroy();
        req.method = "GET";
        return res.redirect(`/haunts/${+hauntId}`);

    } else {
        const err = Error(`Review with an id of ${reviewId} could not be found.`);
        err.title = "Review not found.";
        err.status = 404;
        return err;
    }
}));
```

<h3>Contributors</h3>
<ul>
  <li>
	<a href=https://github.com/juneskim>June Kim</a></li>
  <li>
	<a href=https://github.com/avenida714>Alec Venida</a></li>
  <li>
	<a href=https://github.com/Patricus>Patrick McPherson</a></li>
  <li>
	<a href=https://github.com/kurikurichan>Krista Strucke</a></li>
</ul>

## Project-related Files ##

* Project flowchart (Draw.io)

```
https://drive.google.com/file/d/1U5m4CTeV3asIi3y7YaD-92OkJexfRoED/view?usp=sharing
```

* Role distribution (Excel Spreadsheet)

```
https://docs.google.com/spreadsheets/d/16HnED6Xv7UGZWam32bMn7SqEXFdmZD4lMn_ATgJTEuw/edit?usp=sharing
```

* Scorecard (Google Doc)

```
spreadhseet google doc?
```

* Group project (Google Doc)

```
group project google doc?
```

* Route outline (Google Doc)

```
google doc?
```

* Database Schema

```
https://github.com/kurikurichan/good-reads-clone/wiki/Database-Schema
```

## GitHub Files ##

* Wiki

```
https://github.com/kurikurichan/good-haunts/wiki
```

* Kanban board

```
https://github.com/kurikurichan/good-reads-clone/projects/1
```

* Source code

```
https://github.com/kurikurichan/good-reads-clone/
```
