import { getImages } from "./image_api"

import Notiflix from "notiflix"


const selectors = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('#input'),
    gallery: document.querySelector('.gallery'),
    button: document.querySelector('.load-more')
}


selectors.form.addEventListener('submit', handleForm)
selectors.button.addEventListener('click', handleClick)

selectors.button.style.display = 'none'

let paginationPage = 1;


function handleClick() {

    paginationPage += 1;

    getImages(`${selectors.form.input.value}`, paginationPage)
    .then(response => {
        if (paginationPage * 40 >= response.total) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
            selectors.button.style.display = 'none'
        }
        const newMarkup = response.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
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
        selectors.gallery.insertAdjacentHTML('beforeend', newMarkup)
        console.log(paginationPage)
    }
)
}


async function handleForm(e) {
    e.preventDefault();
    paginationPage = 1;
    await getImages(`${selectors.form.input.value}`)
        .then(response => {
            selectors.button.style.display = 'block'
            if (response.total === 0){
                Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
                selectors.button.style.display = 'none'
            }
            const markup = response.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
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

