import {
  alertImagesFound,
  alertNoEmptySearch,
  alertEndOfSearch,
  alertNoImagesFound,
} from './alert-search';
import { fetchImages } from './fetch-images';
import { renderGallery } from './render-gallery';
import { onScroll, onToTopBtn } from './scroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more'); // для використання з кнопкою load more

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

onScroll();
onToTopBtn();

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
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        alertImagesFound(data);
        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden'); // для використання з кнопкою load more
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
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
// function infiniteScroll() {
//   const contentHeight = gallery.offsetHeight;
//   let yOffset = window.pageYOffset;
//   let windowHeight = window.innerHeight;
//   // console.log('scroll');

//   if (yOffset + windowHeight >= contentHeight) {
//     page += 1;
//     simpleLightBox.destroy();
//     fetchImages(query, page, perPage)
//       .then(({ data }) => {
//         renderGallery(data.hits);
//         simpleLightBox = new SimpleLightbox('.gallery a').refresh();
//       })
//       .catch(error => {
//         console.log(error);
//         if (error.response.status === 400) alertEndOfSearch();
//       });
//   }
// }
searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMore); // для використання з кнопкою load more
// window.addEventListener('scroll', throttle(infiniteScroll, 500));
