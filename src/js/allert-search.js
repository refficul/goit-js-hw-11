import { Notify } from 'notiflix';

export {
  alertImageFound,
  alertNoEmptySearch,
  alertNoImagesFound,
  alertEndOfSearch,
};
function alertImageFound(data) {
  Notify.success(`"Hooray! We found ${totalHits} images.`);
}
function alertNoEmptySearch() {
  Notify.failure(
    'The search string can not be empty. Please specify your search query.'
  );
}
function alertNoImagesFound() {
  Notify.failure('sorry? there are no images found. Please try again.');
}
function alertEndOfSearch() {
  Notify.info("Sorry, but you've reached the end of search results");
}
