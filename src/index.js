import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';

let nameImage = '';
let pageCount = 1;
let totalHits;
let perPage = 40;
const searchBox = document.querySelector('#search-form');
const boxImage = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const KEY = "26842209-8060593a7142b471474d704cf"


loadMoreBtn.style.display = 'none';

searchBox.addEventListener('submit', onText);

function onText(event) {
  event.preventDefault();
  nameImage = event.currentTarget.elements.searchQuery.value.trim();

  pageCount = 1;

  fetchUser(nameImage).then(renderImage);

  boxImage.innerHTML = '';
}

async function renderImage({ data, data: { hits } }) {
  console.log(data)
  totalHits = data.totalHits;

  if (totalHits === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  if (pageCount === 1) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  }

  const markup = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card"><img src=${webformatURL} alt="${tags}" loading="lazy" /><div class="info">
        <p class="info-item">
          <b>Likes</b> 
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
      </div>
      </div>`;
    })
    .join('');
  boxImage.insertAdjacentHTML('beforeend', markup);

  loadMoreBtn.style.display = 'block';

  pageCount += 1;
}

async function fetchUser(elements) {
  return await axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${elements}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageCount}&per_page=${perPage}`,
  );
}

function loadMore() {
  loadMoreBtn.addEventListener('click', () => {
    if (pageCount * perPage > totalHits) {
      loadMoreBtn.style.display = 'none';
      return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    fetchUser(nameImage).then(renderImage);
  });
}
loadMore();
