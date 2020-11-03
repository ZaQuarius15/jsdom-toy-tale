//DECLARED VAIRABLES
const toysUrl = `http://localhost:3000/toys`;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyDiv = document.getElementById('toy-collection');
let addToy = false;



//DEFINED FUNCTIONS

const renderOneToy = (toy) => {
  toyDiv.innerHTML += `<div class="card">
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  </div>`
}

const renderToys = (toysArray) => {
  toysArray.forEach( toy => {
    renderOneToy(toy)
  })
}

const fetchToys = () => {
  fetch(toysUrl)
  .then(resp => resp.json())
  .then(toysArray => {
    renderToys(toysArray)
  })
};


//INVOKED FUNCITONS

fetchToys();






  //EVENT LISTENERS

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });



