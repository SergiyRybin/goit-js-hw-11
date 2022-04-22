import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';

// import * as basicLightbox from 'basiclightbox'
// import simpleLightbox from 'simplelightbox';
// Notiflix.Notify.success( 'Message');


let nameImage = '';
let pageCount = 1;
const searchBox = document.querySelector("#search-form")
const boxImage = document.querySelector(".gallery")
const loadMoreBtn = document.querySelector(".load-more")

loadMoreBtn.disabled = true

searchBox.addEventListener("submit", onText)

function onText(event){

    event.preventDefault()

    nameImage = event.currentTarget.elements.searchQuery.value
    fetchUser(nameImage)
    .then(renderImage)
    .then(loadMore)
  }
  function renderImage({data, data:{hits}}){
    if(data.totalHits===0){
     return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

    const markup = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>{
      return `<div class="photo-card"><img src=${webformatURL} alt="" loading="lazy" /><div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
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
      </div>`
    }).join("")

    boxImage.insertAdjacentHTML("beforeend", markup)

    loadMoreBtn.disabled = false
    pageCount+=1

}

async function fetchUser(elements){
    return await axios.get(`https://pixabay.com/api/?key=26842209-8060593a7142b471474d704cf&q=${elements}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageCount}&per_page=10`)
}

 function loadMore(){
  loadMoreBtn.addEventListener("click", ()=>{
    fetchUser(nameImage).then(renderImage)
  })
}
