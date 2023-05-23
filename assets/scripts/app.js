const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header  button");
const backdrop = document.getElementById("backdrop");
const addBtn = document.getElementsByClassName('btn btn--success');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
// const confirmAddMovieBtn = addMovieModal.querySelector('.btn--success');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll('input');

const movies = [];


const toggleBackrop = () => {
  backdrop.classList.toggle("visible");
};


const clearMovieInput  = () => {
  for(const userInput of userInputs){
    userInput.value = '';
  }
}

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
}
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackrop();
};

// const toggleMovieModal = () => {
//   addMovieModal.classList.toggle("visible");
//   toggleBackrop();
// };


const backdropClickHandler = () => {
    showMovieModal();
    closeMovieModal();
    clearMovieInput();
    
}



const cancelAddMovieHandler = () => {
    showMovieModal();
    closeMovieModal();
    clearMovieInput();
    
}


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
        id : Math.random().toString(),
        title: title,
        image: image,
        rating: rating
      }

      movies.push(newMovie);
      console.log(movies);
     
      // toggleMovieModal();
      closeMovieModal();
      toggleBackrop();
      clearMovieInput();

}




startAddMovieBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler)