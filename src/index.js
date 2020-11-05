const toysURL = `http://localhost:3000/toys`;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollectionDiv = document.getElementById("toy-collection");
const toyForm = document.querySelector('.add-toy-form');
let addToy = false;



addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

const fetchToys = () => {
  fetch(toysURL)
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
}



const renderToys = (toys) => {
  toyCollectionDiv.innerHTML = ''
  for (toy of toys) {
    renderOneToy(toy)
  }
}

const renderOneToy = (toy) => {
  const tern = toy.likes === 1 ? "Like" : "Likes"
  toyCollectionDiv.innerHTML += `<div data-id=${toy.id} class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p>${toy.likes} ${tern}</p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
  </div>`
}


fetchToys()

const handleFormSubmit = (form) => {
  const name = form['name'].value;
  const image = form['image'].value;
  form.reset();
  const formData= {
    name: name,
    image: image,
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
  .then(resp => resp.json())
  .then(toyObject => {
    renderOneToy(toyObject)
  })
}

toyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmit(e.target);
})

const handleLikes = (target) => {
  const toyId = target.dataset.id;
  const numLikes = parseInt(target.previousElementSibling.innerText);
  const incLikes = numLikes + 1;
  const formData = {
    likes: incLikes
  }
  const tern = incLikes === 1 ? "Like" : "Likes";
  target.previousElementSibling.innerText = `${incLikes} ${tern}`
  const reqObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch(toysURL+'/'+toyId, reqObj)
    .then(resp => resp.json())
    .then(updatedToy => {
      fetchToys()
    })
}

document.addEventListener("click", (e) => {
  if (e.target.className === "like-btn") {
    handleLikes(e.target)
  }
})