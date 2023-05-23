const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header  button");
const backdrop = document.getElementById("backdrop");
const addBtn = document.getElementsByClassName("btn btn--success");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
// const confirmAddMovieBtn = addMovieModal.querySelector('.btn--success');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll("input");

const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackrop = () => {
  backdrop.classList.toggle("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMovieDeletionModal = () => {
  toggleBackrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1); 
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();

  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackrop();

  const cancelDelationBtn = deleteMovieModal.querySelector(".btn--passive");
  let confirmDelationBtn = deleteMovieModal.querySelector(".btn--danger");

  confirmDelationBtn.replaceWith(confirmDelationBtn.cloneNode(true));
  
  confirmDelationBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelDelationBtn.removeEventListener('click', closeMovieDeletionModal)
  cancelDelationBtn.addEventListener("click", closeMovieDeletionModal);

  confirmDelationBtn.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );

}

const renderNewMovie = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
   <div class="movie-element__image">
   <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
   <h2>${title}</h2>
   <p>${rating}/5 stars</p>
 </div>
   `;

  newMovieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, id)
  );
  const listRoot = document.getElementById("movie-list");
  listRoot.appendChild(newMovieElement);
};


const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackrop();
};


const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};



const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackrop();
  clearMovieInput();
};

const addMovieHandler = () => {
  const title = userInputs[0].value;
  const image = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === "" ||
    image.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Please enter a valid values (rating from 1-5) or valid URL !");
    return;
  }

  let newMovie = {
    id: Math.random().toString(),
    title: title,
    image: image,
    rating: rating,
  };

  movies.push(newMovie);
  console.log(movies);

  // toggleMovieModal();
  closeMovieModal();
  toggleBackrop();
  clearMovieInput();
  renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

startAddMovieBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", addMovieHandler);
