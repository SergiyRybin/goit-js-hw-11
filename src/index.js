import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';

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
    fetchUser(nameImage).then(renderImage)
  }

  // {webformatURL, largeImageURL, tags, likes, views, comments }

  function renderImage({data, data:{hits}}){
    const markup = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments})=>{
      return `<div class="photo-card"><img src=${webformatURL} alt="" loading="lazy" /><div class="info">
        <p class="info-item">
          <b>${likes} Likes</b>
        </p>
        <p class="info-item">
          <b>${views} Views</b>
        </p>
        <p class="info-item">
          <b>${comments} Comments</b>
        </p>
        <p class="info-item">
          <b>${tags} Downloads</b>
        </p>
      </div>
      </div`
    }).join("")

    boxImage.insertAdjacentHTML("beforeend", markup)
}
function fetchUser(elements){
  return axios.get(`https://pixabay.com/api/?key=26842209-8060593a7142b471474d704cf&q=${elements}&image_type=photo)`)

}