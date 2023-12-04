import { mark } from "@vimeo/player";
import { getImages } from "./image_api"

import Notiflix from "notiflix"


const selectors = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('#input'),
    gallery: document.querySelector('.gallery')
}

selectors.form.addEventListener('submit', handleForm)







async function handleForm(e) {
    e.preventDefault();
    await getImages(`${selectors.form.input.value}`)
        .then(response => {
            console.log(response);

            const markup = response.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
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


        })

}


//if data is empty
// Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")