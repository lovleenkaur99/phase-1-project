# NYC Best Vegan Spots

The phase-1 Project is a blog about vegan restaurants in NYC. The clients can add their favorite restaurant starting with the name of the restaurant and the author (the client), with an image of logo (if it has any), an alternative image (could be an image of food, or anything relating to the restaurant you want to add), a description, and submit the form to add to the list of restuarants. The clients are able to like the restaurant individually. The resturants added can also be deleted. 

The project has four event listeners including "two clicks, submit, and mouseover". The first click event, when clicked on the photo shows the description and likes for the individual restuarant. The second click event listeners is for likes and by using "Patch Request" we are able to keep the like updating and stayign updated. The submit event listener is for submiting the form. The mouseover event listener is for changing the photos in the resturant display secion. 

The project has five objects, which are the restuarants individually. The objects are terms "BESU, HANG, JAJA, FRAN, and REDBAM". The objects have attributes including "class = "restuarant-display", this attribute displays all the images from the db.json. The other attributes are "resturant-details" this is the parent, and it includes three children "detail-image, name, and description". There are few other attributes for the button and the form. 

The "Patch" is used to be certain that the changes made on the front-end like adding a form or liking a restuarant actually stays. 

The methods being used are ".forEach' and ".map". To iterate through an array the "forEach is used. There are five objects, which needs to be iterated through. ".map" is used for the likes. 

