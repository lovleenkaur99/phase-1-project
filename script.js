fetch("http://localhost:3000/restaurants")
  .then(response => response.json())
  .then(restaurants => {
    restaurants.forEach(restaurant => {
      renderRestaurants(restaurant)
    })
    showRestaurantDetail(restaurants[0])
  })

const foodsData = {
  1: {
    id: 6,
    title: "Beyond Sushi",
    image: "https://beyondsushi.com/wp-content/uploads/2022/12/IMG_4198.jpg",
    description: "Beyond Sushi is a vegan culinary wonderland, offering a delightful variety of plant-based sushi and other dishes. The Fried Chick'n Bao is a standout favorite, boasting perfectly seasoned mock chicken in a steamed bun. The Rainbow Roll (IMAGE) is a dazzling creation, bursting with vibrant vegetables and captivating flavors. The restaurant's welcoming staff ensures a memorable and enjoyable dining experience. A must-visit for food enthusiasts seeking a scrumptious and ethical feast.",
  },
  2: {
    id: 7,
    title: "Hangawi Korean",
    image: "https://www.ablogvoyage.com/wp-content/uploads/2020/06/Hangawi_007.jpg",
    description: "HanGawi, a Korean vegan hotspot, envelops diners in a unique atmosphere, setting it apart from others. Their menu boasts traditional teas and dishes, with friendly staff always ready to guide newcomers. Due to its popularity, reservations are highly recommended. Don't miss their delightful Mongolian hot pot (IMAGE), an interactive and aromatic culinary experience. A must-visit destination for those seeking extraordinary vegan delights.",
  },
  3: {
    id: 8,
    title: "Jajaja Mexicana",
    image: "https://static.urbandaddy.com/uploads/assets/image/articles/standard/f5365651de73e8da96fa5ed0df6fe03b.jpg",
    description: "Jajaja is a Mexican vegan gem with a modern twist, enchanting food enthusiasts across four city locations. Their Faux Chorizo Laden Nachos (IMAGE) redefine indulgence, blending bold flavors with compassionate ingredients. An unforgettable night out awaits, as Jajaja's vibrant ambiance and exquisite cuisine captivate all who visit.",
  },
  4: {
    id: 9,
    title: "Franchia Cafe",
    image: "https://images.happycow.net/venues/1024/22/65/hcmp2265_1220079.jpeg",
    description: "Franchia, a Korean-based vegan haven, offers a diverse menu with delightful curries, appetizers, desserts, and an array of teas. The Vegan Chirashi Bowl (IMAGE) is a visual and flavorful masterpiece. With impeccable interiors and scrumptious food, Franchia promises an unforgettable dining experience.",
  },
  5: {
    id: 10,
    title: "Red Bamboo",
    image: "https://nyandabout.com/wp-content/uploads/2018/01/F64A7539.jpg",
    description: "Red Bamboo, an Asian-based vegan paradise, charms with great food in a cozy setting. No reservations, first-come-first-served. Don't miss their Barbecue Buffalo Wings and delightful Asian Steamed Dumplings (IMAGE). Mocktails add to the experience, making it a must-visit destination for plant-based food enthusiasts.",
  },
};

function renderRestaurants(restaurant) {
  const nav = document.querySelector('#restaurant-display');
  const img = document.createElement('img');
  img.src = restaurant.image;
  img.dataset.id = restaurant.id; // Store the restaurant id as a data attribute for later use
  nav.appendChild(img);

  img.addEventListener('click', () => {
    showRestaurantDetail(restaurant);
  });
}

function showRestaurantDetail(restaurant) {
  const image = document.querySelector('.detail-image');
  image.src = restaurant.image;

  const name = document.querySelector('.name');
  name.textContent = restaurant.title;

  const description = document.querySelector('.description');
  description.textContent = restaurant.description;

  const comment = document.querySelector('#restaurant-comment');
  comment.textContent = restaurant.comment;

  // Show the corresponding food details based on the restaurant id
  const foodData = foodsData[restaurant.id];
  const foodName = document.querySelector('#restaurant-detail .name');
  foodName.textContent = foodData.title;

  const foodDescription = document.querySelector('#restaurant-detail .description');
  foodDescription.textContent = foodData.description;

  const foodImage = document.querySelector('#restaurant-detail .detail-image');
  foodImage.src = foodData.image;
}


// fetch(" http://localhost:3000/restaurants")
// .then(response => response.json())
// //.then(restaurants => constructRestaurantElements(restaurants))
// .then(restaurants => { 
//   restaurants.forEach(restaurant => { 
//       renderRestaurants(restaurant)
//   })
//   showRestaurantDetail(restaurants[0])
// })


// function renderRestaurants(restaurants){ 
    
//   const nav = document.querySelector('#restaurant-display')
//   const img = document.createElement('img')

//   img.src = restaurants.image
//   nav.appendChild(img)

//   img.addEventListener('click', () => { 
//       showRestaurantDetail(restaurants)
//   })

//   img.addEventListener("mouseover", restaurants);
//     img.src = restaurants.image
 
  
// }

// function showRestaurantDetail(list) { 
  
//   const image = document.querySelector('.detail-image')
//   image.src = list.image

//   const name = document.querySelector('.name')
//   name.textContent = list.title

//   const description = document.querySelector('.description')
//   description.textContent = list.description

//   const comment = document.querySelector('#restaurant-comment')
//   comment.textContent = list.comment

// }

// const form = document.querySelector('#restaurant-comment')
// form.addEventListener('submit', (e) =>{
//   e.preventDefault()
  
//   const newComment = e.target['new-comment'].value 
//   const newRestaurantComment = { 
      
//       "comment" : newComment
//   }
//   renderRestaurants(newRestaurantComment)
// })



