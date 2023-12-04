import { mark } from "@vimeo/player";
import { getImages } from "./image_api"

import Notiflix from "notiflix"


const selectors = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('#input'),
    gallery: document.querySelector('.gallery'),
    button: document.querySelector('.load-more')
}



selectors.form.addEventListener('submit', handleForm)

selectors.button.style.display = 'none'




async function handleForm(e) {
    e.preventDefault();
    await getImages(`${selectors.form.input.value}`)
        .then(response => {
            markup = response.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" height="390" width="600"/>
        <div class="info">
            <p class="info-item">
                <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views: ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: ${downloads}</b>
            </p>
        </div>
    </div>`).join('')
            selectors.gallery.innerHTML = markup
            selectors.button.style.display = 'block'

        })
}


//if data is empty
// Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")