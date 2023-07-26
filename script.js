document.addEventListener("DOMContentLoaded", () => {
  let restaurantsData = [];

  // Fetch restaurant data from the server
  function fetchRestaurants() {
    return fetch("http://localhost:3000/restaurants")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        return []; // Return an empty array if fetch fails
      });
  }

  // Render restaurants and show the first restaurant detail
  function renderRestaurants(restaurants) {
    restaurants.forEach((restaurant) => {
      const nav = document.querySelector("#restaurant-display");
      const img = document.createElement("img");
      img.src = restaurant.image;
      img.dataset.id = restaurant.id;
      img.dataset.defaultImage = restaurant.image;
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
      },
      body: JSON.stringify({ likes }),
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

    
    
    
    
    
    
    // const foodsData = {
    //   1: {
    //     id: 6,
    //     title: "Beyond Sushi",
    //     image: "https://beyondsushi.com/wp-content/uploads/2022/12/IMG_4198.jpg",
    //     description: "Beyond Sushi is a vegan culinary wonderland, offering a delightful variety of plant-based sushi and other dishes. The Fried Chick'n Bao is a standout favorite, boasting perfectly seasoned mock chicken in a steamed bun. The Rainbow Roll (IMAGE) is a dazzling creation, bursting with vibrant vegetables and captivating flavors. The restaurant's welcoming staff ensures a memorable and enjoyable dining experience. A must-visit for food enthusiasts seeking a scrumptious and ethical feast.",
    //   },
    //   2: {
    //     id: 7,
    //     title: "Hangawi Korean",
    //     image: "https://www.ablogvoyage.com/wp-content/uploads/2020/06/Hangawi_007.jpg",
    //     description: "HanGawi, a Korean vegan hotspot, envelops diners in a unique atmosphere, setting it apart from others. Their menu boasts traditional teas and dishes, with friendly staff always ready to guide newcomers. Due to its popularity, reservations are highly recommended. Don't miss their delightful Mongolian hot pot (IMAGE), an interactive and aromatic culinary experience. A must-visit destination for those seeking extraordinary vegan delights.",
    //   },
    //   3: {
    //     id: 8,
    //     title: "JaJaJa Mexicana",
    //     image: "https://static.urbandaddy.com/uploads/assets/image/articles/standard/f5365651de73e8da96fa5ed0df6fe03b.jpg",
    //     description: "Jajaja is a Mexican vegan gem with a modern twist, enchanting food enthusiasts across four city locations. Their Faux Chorizo Laden Nachos (IMAGE) redefine indulgence, blending bold flavors with compassionate ingredients. An unforgettable night out awaits, as Jajaja's vibrant ambiance and exquisite cuisine captivate all who visit.",
    //   },
    //   4: {
    //     id: 9,
    //     title: "Franchia Cafe",
    //     image: "https://images.happycow.net/venues/1024/22/65/hcmp2265_1220079.jpeg",
    //     description: "Franchia, a Korean-based vegan haven, offers a diverse menu with delightful curries, appetizers, desserts, and an array of teas. The Vegan Chirashi Bowl (IMAGE) is a visual and flavorful masterpiece. With impeccable interiors and scrumptious food, Franchia promises an unforgettable dining experience.",
    //   },
    //   5: {
    //     id: 10,
    //     title: "Red Bamboo",
    //     image: "https://nyandabout.com/wp-content/uploads/2018/01/F64A7539.jpg",
    //     description: "Red Bamboo, an Asian-based vegan paradise, charms with great food in a cozy setting. No reservations, first-come-first-served. Don't miss their Barbecue Buffalo Wings and delightful Asian Steamed Dumplings (IMAGE). Mocktails add to the experience, making it a must-visit destination for plant-based food enthusiasts.",
    //   },
    // };
  
  
  // Show the corresponding food details based on the restaurant id
  // const foodData = foodsData[restaurant.id];
  // const foodName = document.querySelector('#restaurant-detail .name');
  // foodName.textContent = foodData.title;

  // const foodDescription = document.querySelector('#restaurant-detail .description');
  // foodDescription.textContent = foodData.description;

  // const foodImage = document.querySelector('#restaurant-detail .detail-image');
  // foodImage.src = foodData.image;

// function showRestaurantDetail(restaurant) {
//   const image = document.querySelector('.detail-image');
//   image.src = restaurant.image;

//   const name = document.querySelector('.name');
//   name.textContent = restaurant.title;

//   const description = document.querySelector('.description');
//   description.textContent = restaurant.description;

//   const foodData = foodsData[restaurant.id];
//   const foodName = document.querySelector('#restaurant-detail .name');
//   // foodName.textContent = foodData.title;

//   const foodDescription = document.querySelector('#restaurant-detail .description');
//   // foodDescription.textContent = foodData.description;

//   const foodImage = document.querySelector('#restaurant-detail .detail-image');
//    foodImage.src = foodData.image;
  // Clear the comment display
  // const commentDisplay = document.querySelector('#comment-display');


  // // Display the comments if available
  // if (restaurant.comment && restaurant.comment.trim() !== '') {
  //   const commentElement = document.querySelector('.comments');
  //   commentElement.textContent = restaurant.comment;
  //   commentDisplay.appendChild(commentElement);
  // }

  // // Add an event listener to the comment form
  // const commentForm = document.querySelector('#restaurant-comment');
  // commentForm.addEventListener('submit', function (event) {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   const newComment = document.querySelector('#new-comment').value;

    
  //   // Display the new comment
  //   const commentDisplay = document.querySelector('#comment-display');
  //   const commentElement = document.querySelector('.comments');
  //   commentDisplay.append(commentElement)
  //   commentElement.textContent = newComment;
  //   commentDisplay.insertBefore(commentElement, commentDisplay.firstChild);
    
    // const OPTIONS = { 
    //   method : "POST",
    //   headers : { 
    //     "Accept": "application/json",
    //     "Content-Type" : "application/json"
    //   },
    //   body : JSON.stringify({ 
    //     title : "",
    //     image : " ",
    //     description : " "
    //   })
    // }
    
    // fetch("http://localhost:3000/restaurants", OPTIONS)
    // .then(response => response.json())
    
    // // Clear the comment input field after adding the comment
    // document.querySelector('#new-comment').value = '';


  



// function renderLikeDislikeButtons(restaurant) {
//   const likeButton = document.createElement('button');
//   likeButton.textContent = 'Like';
//   likeButton.addEventListener('click', () => {
//     increaseLikeCounter(restaurant);
//   });

//   const dislikeButton = document.createElement('button');
//   dislikeButton.textContent = 'Dislike';
//   dislikeButton.addEventListener('click', () => {
//     increaseDislikeCounter(restaurant);
//   });

//   const likeCounter = document.createElement('span');
//   likeCounter.textContent = 'Likes: 0';

//   const dislikeCounter = document.createElement('span');
//   dislikeCounter.textContent = 'Dislikes: 0';

//   const likeDislikeDiv = document.createElement('div');
//   likeDislikeDiv.appendChild(likeButton);
//   likeDislikeDiv.appendChild(likeCounter);
//   likeDislikeDiv.appendChild(dislikeButton);
//   likeDislikeDiv.appendChild(dislikeCounter);

//   const restaurantDetail = document.querySelector('#restaurant-detail');
//   restaurantDetail.appendChild(likeDislikeDiv);
// }

// let likeCounters = {};
// let dislikeCounters = {};

// function increaseLikeCounter(restaurant) {
//   if (!likeCounters[restaurant.id]) {
//     likeCounters[restaurant.id] = 1;
//   } else {
//     likeCounters[restaurant.id]++;
//   }
//   updateLikeDislikeCounters(restaurant);
// }

// function increaseDislikeCounter(restaurant) {
//   if (!dislikeCounters[restaurant.id]) {
//     dislikeCounters[restaurant.id] = 1;
//   } else {
//     dislikeCounters[restaurant.id]++;
//   }
//   updateLikeDislikeCounters(restaurant);
// }

// function updateLikeDislikeCounters(restaurant) {
//   const likeCounter = document.querySelector(`[data-like-counter="${restaurant.id}"]`);
//   const dislikeCounter = document.querySelector(`[data-dislike-counter="${restaurant.id}"]`);

//   likeCounter.textContent = `Likes: ${likeCounters[restaurant.id] || 0}`;
//   dislikeCounter.textContent = `Dislikes: ${dislikeCounters[restaurant.id] || 0}`;
// }

// function showRestaurantDetail(restaurant) {
//   // Existing code...

//   // Add the restaurant id as data attributes to like and dislike counters
//   const likeCounter = document.querySelector('#like-counter');
//   const dislikeCounter = document.querySelector('#dislike-counter');
//   likeCounter.dataset.likeCounter = restaurant.id;
//   dislikeCounter.dataset.dislikeCounter = restaurant.id;

