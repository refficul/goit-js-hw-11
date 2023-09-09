import Notiflix from 'notiflix';
export {
  alertImagesFound,
  alertNoEmptySearch,
  alertEndOfSearch,
  alertNoImagesFound,
};

function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
