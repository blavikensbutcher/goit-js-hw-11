import { getImages } from "./image_api";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";








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
            ///////CHECK WHATS PAGE IS IT
            if (paginationPage * 40 >= response.total) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results");
                selectors.button.style.display = 'none'
            }
            //////CREATE MARKUP
            const newMarkup = response.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<div class="photo-card item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" height="390" width="600"/>
            </a>
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

            ////////INSERT HTML
            selectors.gallery.insertAdjacentHTML('beforeend', newMarkup);


            ////////ADD LIGHTBOX
            let lightbox = new simpleLightbox('.gallery a', {
                overlayOpacity: 0.8,
                captionSelector: 'img',
                captionsData: 'alt',
                captionDelay: 250
            });
        }
        )
}


async function handleForm(e) {
    e.preventDefault();
    paginationPage = 1;
    await getImages(`${selectors.form.input.value}`)
        .then(response => {
            ///////BUTTON SHOW///////
            selectors.button.style.display = 'block'

            ////////CHECK TOTAL RESULT////////
            if (response.total === 0) {
                Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
                selectors.button.style.display = 'none'
            }

            /////////CREATE MARKUP///////
            const markup = response.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<div class="photo-card">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" height="390" width="600"/>
            </a>
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

            ////////INSERT HTML/////////
            selectors.gallery.innerHTML = markup;


            ////////ADD LIGHTBOX/////////
            let lightbox = new simpleLightbox('.gallery a', {
                overlayOpacity: 0.8,
                captionSelector: 'img',
                captionsData: 'alt',
                captionDelay: 250
            });

            Notiflix.Loading.remove();

        })
}

