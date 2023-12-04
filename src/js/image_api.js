import axios from "axios"
import Notiflix from "notiflix";
export { getImages }


// let page = 1;

function getImages(input) {
    Notiflix.Block.pulse('.photo-card', 'Loading...');

    const options = {
        key: '41061573-024b7cbeabeac3d17174d6333',
        q: String(input),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        // page: page,
        per_page: '40'

    }

    const params = new URLSearchParams(options)

    return axios.get(`https://pixabay.com/api/?${params}`)
        .then(response => {
            Notiflix.Block.remove('.photo-card');
            return response.data.hits
        })
        .catch(error => console.log(Notiflix.Report.failure("CONNECTION ERROR", String(error), "OK")))
}
