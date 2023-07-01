fetch("http://localhost:3001/restaurants")
.then(response => response.json())
//.then(restaurants => constructRestaurantElements(restaurants))
.then(restaurants => { 
  restaurants.forEach(restaurant => { 
      renderRestaurants(restaurant)
  })
  showRestaurantDetail(restaurants[0])
})


function renderRestaurants(restaurants){ 
    
  const nav = document.querySelector('#restaurant-display')
  const img = document.createElement('img')

  img.src = restaurants.image
  nav.appendChild(img)

  img.addEventListener('click', () => { 
      showRestaurantDetail(restaurants)
  })

  img.addEventListener("mouseover", restaurants);
    img.src = restaurants.image
 
  
}

function showRestaurantDetail(list) { 
  
  const image = document.querySelector('.detail-image')
  image.src = list.image

  const name = document.querySelector('.name')
  name.textContent = list.title

  const description = document.querySelector('.description')
  description.textContent = list.description

  const comment = document.querySelector('#restaurant-comment')
  comment.textContent = list.comment

}

const form = document.querySelector('#restaurant-comment')
form.addEventListener('submit', (e) =>{
  e.preventDefault()
  
  const newComment = e.target['new-comment'].value 
  const newRestaurantComment = { 
      
      "comment" : newComment
  }
  renderRestaurants(newRestaurantComment)
})



