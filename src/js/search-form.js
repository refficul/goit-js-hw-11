import simpleLightbox from 'simplelightbox';
import {
  alertImageFound,
  alertNoEmptySearch,
  alertNoImagesFound,
  alertEndOfSearch,
} from './allert-search';
import { fetchImages } from './fetch-images';
import { searchForm, loadMoreBtn } from './refs';
import { renderGallery } from './render-gallery';
// import { onToTopBtn } from './onScroll';

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;
// onToTopBtn();
function onSearchForm(evt) {
  evt.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = evt.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden'); // для використання з кнопкою load more
  if (query === '') {
    alertNoEmptySearch();
    return;
  }
  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoImagesFound();
      } else {
        renderGallery(data.hits);
        simpleLightbox - new SimpleLightbox('.gallery a').refresh();
        alertImageFound(data);
        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden'); // для використання з кнопкою load more
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => searchForm.reset());
}

function onLoadMore() {
  page += 1;
  simpleLightBox.destroy();

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      const totalPages = Math.ceil(data.totalHits / perPage);
      if (page === totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        alertEndOfSearch();
      }
    })
    .catch(error => console.log(error));
}

searchForm.addEventListener('sumbit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMore);
