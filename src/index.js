import './sass/main.scss';
// import simpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';
import * as basicLightbox from 'basiclightbox'


// Notiflix.Notify.success( 'Message');
let nameImage = '';
const searchBox = document.querySelector("#search-form")
const boxImage = document.querySelector(".gallery")

searchBox.addEventListener("submit", onText)

function onText(event){
    event.preventDefault()
    // listCountry.innerHTML='';
    nameImage = event.currentTarget.elements.searchQuery.value
 
    // if(nameImage===""){
    //  return
    //   }
    fetchUser(nameImage).then(renderImage).then(openModal)
    // .catch(Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
  }

  // {webformatURL, largeImageURL, tags, likes, views, comments }

  function renderImage({data, data:{hits}}){
    const markup = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>{
      return `<div class="photo-card"><img src=${webformatURL} alt= loading="lazy" /><div class="info">
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
  

// let galleryModal = new simpleLightbox('.gallery .photo-card', {
//   caption: true,
//   captionsData: 'alt',
//   captionDelay: 250,
//   close: true,
//   closeText: "&#x2612;",
//   nav: true,
//   navText: ['&#8656;','&#8658;']
// })
}
function fetchUser(elements){
  return axios.get(`https://pixabay.com/api/?key=26842209-8060593a7142b471474d704cf&q=${elements}&image_type=photo)`)
}

function openModal (event){
//  event.addEventListener
// const card =  document.querySelector(".photo-card")
  // console.log(event.currentTarget)

  // const intanse = basicLightbox.create(`<div class="modal">
  // <img src=${data.hits.largeImageURL} width = 900vw >
  // </div>
  // `)
  // intanse.show()
}