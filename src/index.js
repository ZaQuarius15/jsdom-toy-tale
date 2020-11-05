//DECLARED VAIRABLES
const toysUrl = `http://localhost:3000/toys`;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.querySelector('.add-toy-form');
const toyDiv = document.getElementById('toy-collection');
let addToy = false;
let arrayOfToys;



//DEFINED FUNCTIONS

const renderOneToy = (toy) => {
  toyDiv.innerHTML += `<div data-id=${toy.id} class="card">
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button data-id=${toy.id} class="like-btn">Like <3</button>
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
    arrayOfToys = toysArray
    renderToys(toysArray)
  })
};

const handleFormSubmit = (form) => {
  const name = form['name'].value;
  const url = form['image'].value;
  form.reset();
  const formData = {
    name: name,
    image: url,
    likes: 0
  }
  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch(toysURL, reqObj)
}

const handleLikes = (target) => {
  const toyId = target.dataset.id;
  const numLikes = parseInt(target.previousElementSibling.innerText);
  const formData = {
    likes: numLikes++
  }
  const reqObj = {
    method: "PATCH",
    headers: {
      "Comtent-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch(toysURL+'/'+toyId, reqObj)
  .then(res => res.json())
  .then(updateToy => {

  })
}

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

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmit(e.target);
})

document.addEventListener("click", (e) => {
  if (e.target.className === "like-btn") {
    handleLikes
  }