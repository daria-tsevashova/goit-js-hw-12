import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('.input');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

const PER_PAGE = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = input.value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, no images found. Try another word.',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    createGallery(data.hits);
    hideLoader();

    if (totalHits > currentPage * PER_PAGE) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images', position: 'topRight' });
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    hideLoader();

    scrollByCardHeight();

    if (currentPage * PER_PAGE >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images',
      position: 'topRight',
    });
    hideLoader();
  }
});

function scrollByCardHeight() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
