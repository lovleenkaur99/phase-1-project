document.addEventListener("DOMContentLoaded", () => {
  let restaurantsData = [];
fetchRestaurants();
  // Fetch restaurant data from the server
  function fetchRestaurants() {
    return fetch("http://localhost:3000/restaurants")
      .then((response) => response.json())
      .then(lists => renderRestaurants(lists)
)
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        return []; // Return an empty array if fetch fails
      });
  }
  // Trash can functionality
  const trashCan = document.querySelector("#trash-can");

  // Function to delete restaurant from the DOM and local storage
  function deleteRestaurant(id) {
    // Remove restaurant from the DOM
    const restaurantImg = document.querySelector(`img[data-id="${id}"]`);
    if (restaurantImg) {
      restaurantImg.remove();
    }

    // Remove restaurant from local storage and update restaurantsData array
    restaurantsData = restaurantsData.filter((restaurant) => restaurant.id !== id);
    localStorage.setItem("restaurants", JSON.stringify(restaurantsData));
  }

  // Event listener for dragging restaurant image to the trash can
  trashCan.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  trashCan.addEventListener("drop", (event) => {
    event.preventDefault();
    const restaurantId = event.dataTransfer.getData("text/plain");
    deleteRestaurant(parseInt(restaurantId));
  });

  // Render restaurants and show the first restaurant detail
  function renderRestaurants(restaurants) {
    restaurants.forEach((restaurant) => {
      const nav = document.querySelector("#restaurant-display");
      const img = document.createElement("img");
      img.src = restaurant.image;
      img.dataset.id = restaurant.id;
      img.dataset.defaultImage = restaurant.image;
      img.draggable = true;
      img.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", event.target.dataset.id);
      });

      img.addEventListener("mouseenter", () => {
        img.src = restaurant.alternateImage;
      });

      img.addEventListener("mouseleave", () => {
        img.src = img.dataset.defaultImage;
      });

      nav.appendChild(img);

      img.addEventListener("click", () => {
        showRestaurantDetail(restaurant);
      });
    });
  }
  

  function showRestaurantDetail(restaurant) {
    const image = document.querySelector(".detail-image");
    image.src = restaurant.image;

    const name = document.querySelector(".name");
    name.textContent = restaurant.title;

    const description = document.querySelector(".description");
    description.textContent = restaurant.description;

    const likeCount = document.querySelector(".text");
    likeCount.textContent = `${restaurant.likes} Likes`;

    likeCount.addEventListener("click", () => {
      restaurant.likes += 1;
      likeCount.textContent = `${restaurant.likes} Likes`;
      updateLikesOnServer(restaurant.id, restaurant.likes);

      // Update the local data with the new likes count
      restaurantsData = restaurantsData.map((r) =>
        r.id === restaurant.id ? { ...r, likes: restaurant.likes } : r
      );
    });
  }
  function updateLikesOnServer(restaurantId, likes) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
    };

    fetch(`http://localhost:3000/restaurants/${restaurantId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data)) // You can handle the server response if needed
      .catch((error) => console.error("Error updating likes:", error));
  }
  function newRestaurant() {
    const newForm = document.querySelector(".form");
    newForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTitle = e.target["new-title"].value;
      const newImage = e.target["new-image"].value;
      const newDescription = e.target["new-description"].value;
      const newAlternateImage = e.target["new-alternateImage"].value;
      const newAuthor = e.target["new-author"].value;
      const newValue = {
        id: Date.now(), // Generate a unique ID for the new restaurant
        title: newTitle,
        image: newImage,
        description: newDescription,
        alternateImage: newAlternateImage,
        
        likes: 0,
      };
      renderRestaurants([newValue]);
      restaurantsData.push(newValue);

      // Save the updated restaurant data to local storage
      localStorage.setItem("restaurants", JSON.stringify(restaurantsData));

      e.target.reset();
    });
  }

  // Check if there are any restaurants data in local storage
  const storedRestaurants = JSON.parse(localStorage.getItem("restaurants"));
  if (storedRestaurants && Array.isArray(storedRestaurants)) {
    restaurantsData = storedRestaurants;
    renderRestaurants(restaurantsData);
    showRestaurantDetail(restaurantsData[0]);
  } else {
    // Fetch restaurants if local storage is empty
    fetchRestaurants()
      .then((fetchedRestaurants) => {
        restaurantsData = fetchedRestaurants;
        renderRestaurants(restaurantsData);
        showRestaurantDetail(restaurantsData[0]);
        localStorage.setItem("restaurants", JSON.stringify(restaurantsData));
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }

  newRestaurant();
});

    
    
    
    
    
    
    